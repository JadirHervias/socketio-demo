$(document).ready(function () {
  // var socket = io('http://localhost');
  var socket = io();

  console.log(socket);

  socket.on('listar', (data) => {
    data = JSON.parse(data);
    for (let i = 0, j = data.length; i < j; i++) {
      fill(data[i]);
    }
  });

  $('#formulario').submit(function (e) {
    e.preventDefault();
    var data = {
      _id: $('#_id').val(),
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val(),
      timezone: $('#timezone').val(),
      locale: $('#locale').val(),
      profile_pic: $('#profile_pic').val(),
    };

    if (data._id === '') {
      $('#_id').focus();
      return alert('Debe ingresar un ID!');
    }

    if (data.first_name === '') {
      $('#first_name').focus();
      return alert('Debe ingresar su nombre!');
    }

    socket.emit('crear', data);
    $('#formulario').trigger('reset');
    return true;
  });
});
