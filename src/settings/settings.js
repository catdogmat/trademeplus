function toggleCheckbox(element, featid, settingid) {
  console.log("Updating setting for " + featid + "." + settingid + " to " + element.checked)
  let setting = featid + "." + settingid;
  let storageObject = {};
  storageObject[setting] = element.checked;
  chrome.storage.sync.set(storageObject).then(() => {
    console.log("Updated");
  });
}

function toggleTextbox(element, featid, settingid) {
  console.log("Updating setting for " + featid + "." + settingid + " to " + element.value)
  let setting = featid + "." + settingid;
  let storageObject = {};
  storageObject[setting] = element.checked;
  chrome.storage.sync.set(storageObject).then(() => {
    console.log("Updated");
  });
}


fetch(chrome.runtime.getURL('features/manifest.json'))
.then(response => response.json())
.then(data => {
  console.log(data);
  for (const feature of data.features) {
    const featureElement = document.createElement('div');
    let featureHTML = ``;
    featureHTML += `<h3>${feature.name}</h3>`;
    featureHTML += `<p>${feature.description}</p>`;
    let settings = [];
    settings.push({id: 'enabled', name: 'Enabled', description: 'Whether the feature is enabled or not.', type: 'checkbox', default: false});
    for (const setting of feature.settings) {
      settings.push(setting);
    }
    for (const setting of settings) {
      featureHTML += `<div class="setting">`;
      featureHTML += `<label for="${setting.id}"><b>${setting.name}</b></label>`;
      featureHTML += `<p>${setting.description}</p>`;
      if (setting.type === 'checkbox') {
        if (setting.default) {
          featureHTML += `<input type="checkbox" id="${setting.id}" name="${setting.id}" checked>`;
        } else {
          featureHTML += `<input type="checkbox" id="${setting.id}" name="${setting.id}">`;
        }
      } else if (setting.type === 'textbox') {
        featureHTML += `<input type="text" id="${setting.id}" name="${setting.id}" value="${setting.default}">`;
      }
      featureHTML += `</div>`;
    }
    featureElement.innerHTML = featureHTML;
    for (const setting of settings) {
      if (setting.type === 'checkbox') {
        const checkbox = featureElement.querySelector(`#${setting.id}`);
        checkbox.addEventListener('change', (event) => {
          toggleCheckbox(event.target, feature.id, setting.id);
        });
        chrome.storage.sync.get([feature.id + "." + setting.id]).then((result) => {
          if (result[feature.id + "." + setting.id] != undefined) {
            checkbox.checked = result[feature.id + "." + setting.id];
          }
        });
      } else if (setting.type === 'textbox') {
        const textbox = featureElement.querySelector(`#${setting.id}`);
        textbox.addEventListener('change', (event) => {
          toggleTextbox(event.target, feature.id, setting.id);
        });
        chrome.storage.sync.get([feature.id + "." + setting.id]).then((result) => {
          if (result[feature.id + "." + setting.id] != undefined) {
            textbox.value = result[feature.id + "." + setting.id];
          }
        });
      }
    }
    document.getElementById('features').appendChild(featureElement);
  }
});

document.getElementById('features')