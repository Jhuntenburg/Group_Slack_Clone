const API_URL = `http://localhost:8080`;

function loadChannelNames() {
  fetch(`${API_URL}/api/channels`)
    .then(response => response.json())
    .then(data => {
      createChannelButtons(data);
    })
    .catch(error => {
      console.error('Error fetching channel data: ', error);
    });
}

function showChannelNames(data) {
  const channelList = document.getElementById('channelList');
  data.forEach(channel => {
    let li = document.createElement('li');
    let channelName = document.createElement('p');
    channelName.textContent = channel.name;
    li.appendChild(channelName);
    channelList.appendChild(li);
  });
}

window.addEventListener('load', loadChannelNames);

var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
}

function createChannelButtons(data) {
  const channelButtons = document.getElementById('channelList');

  data.forEach(channel => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = channel.name;
    button.addEventListener('click', function () {
      handleChannelButtonClick(channel.name);
    });

    const li = document.createElement('li');
    li.appendChild(button);
    channelButtons.appendChild(li);
  });
}

function handleChannelButtonClick(channelName) {
  const channelNameElement = document.querySelector('.channel-name');
  channelNameElement.textContent = channelName;
}