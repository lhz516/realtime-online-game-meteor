import { Template } from 'meteor/templating';
import { Streamy } from 'meteor/yuukan:streamy';

Template.room.onRendered(() => {
  const roomId = Router.current().params.roomId;
  const posX = Math.floor((Math.random() * 320) + 1);
  const posY = Math.floor((Math.random() * 450) + 1);
  Streamy.rooms(roomId).emit('onEnter', { posX, posY });
});

Streamy.on('onEnter', (d) => {
  $('.messages').append(`<p>${d.__from} joined the room</p>`); // Will print 'world!'
  $('#game-container').append(
      $(`<div id="${d.__from}" class="player"></div>`)
          .css('left', `${d.posX}px`)
          .css('top', `${d.posY}px`)
  );
  const roomId = Router.current().params.roomId;
  const $myPlayer = $(`#${Streamy.id()}`);
  $myPlayer.draggable({
    cursor: 'move',
    containment: 'parent',
    drag(event, ui) {
      Streamy.rooms(roomId).emit('move', {
        posX: `${ui.position.left}px`,
        posY: `${ui.position.top}px`
      });
    }
  });
  const posX = $myPlayer.css('left');
  const posY = $myPlayer.css('top');
  Streamy.rooms(roomId).emit('init', { posX, posY });
});

Streamy.on('init', (d) => {
  const $player = $(`#${d.__from}`);
  if ($player.length) {
    $player.css({
      left: `${d.posX}`,
      top: `${d.posY}`
    });
  } else {
    $('#game-container').append(
        $(`<div id="${d.__from}" class="player"></div>`)
            .css({
              left: `${d.posX}`,
              top: `${d.posY}`
            })
    );
  }
});

Streamy.on('move', (d) => {
  const $player = $(`#${d.__from}`);
  if (d.__from !== Streamy.id()) {
    $player.css({
      left: `${d.posX}`,
      top: `${d.posY}`
    });
  }
});
