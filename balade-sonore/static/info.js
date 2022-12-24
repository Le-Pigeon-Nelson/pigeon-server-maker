function updateTableInfo(items) {
    const table = document.getElementById("testBody");
    table.innerHTML = '';
    items.forEach( item => {
      let row = table.insertRow();
      // number
      row.insertCell().innerHTML = item.number;
      // title
      row.insertCell().innerHTML = `<input type='text' value='`+item.number+`' />`;
      // pos
      row.insertCell().innerHTML = item.position.lat.toFixed(4) + ' ' + item.position.lng.toFixed(4);
      // read_once
      row.insertCell().innerHTML = item.getReadOnce();  
      // groupe
      let groupLabel = document.createElement('span');
      groupLabel.textContent = item.group.name;
      // btnDelete.onclick = () => {item.remove(); delete item;}
      row.insertCell().append(groupLabel);
      // period
      row.insertCell().innerHTML = item.getReqPeriod();
      // remove
      let btnDelete = document.createElement('button');
      btnDelete.textContent = "Effacer";
      btnDelete.onclick = () => {item.remove(); delete item;}
      row.insertCell().append(btnDelete);

    });
  }
