function addImage() {
    const div = document.createElement('div');
    div.className = 'row';
    
    div.innerHTML = `
    
    <label class="w3-text-teal"><b>Select file</b></label>
    <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">

    `;
  
    document.getElementById('adiciona').appendChild(div);
  }
