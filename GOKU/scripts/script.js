// Copyright - MusaVR LLC

const Animation = require('Animation');
const FaceTracking = require('FaceTracking');
const Scene = require('Scene');
const Audio = require('Audio');
const Diagnostics = require('Diagnostics');

const fd = Scene.root.child("Device").child("Camera").child("Focal Distance");
const ft0 = fd.child("facetracker0");

// Super Saiyan Animations
const overlay = fd.child('overlay_canvas');
const saiyan_sparks_anim = ft0.child('saiyan_sparks_anim');
const saiyan_flash_anim = overlay.child('saiyan_flash_anim');

// Super Saiyan Sounds
// const goku_scream = Scene.root.child('goku_screaming_sound');
const goku_scream_controller = Audio.getPlaybackController("goku_scream_controller");
goku_scream_controller.setPlaying(false);
goku_scream_controller.setLooping(true);


// TODO: have different super saiyan levels based on mouth.openness
const mouthIsOpen =
  FaceTracking.face(0).mouth.openness.gt(0.3).and(FaceTracking.count.gt(0));
  /*
  FaceTracking.face(0).mouth.openness.gt(0.3).and(FaceTracking.count.gt(0)) ||
  FaceTracking.face(1).mouth.openness.gt(0.3).and(FaceTracking.count.gt(1)) ||
  FaceTracking.face(2).mouth.openness.gt(0.3).and(FaceTracking.count.gt(2));

  */

mouthIsOpen.monitor().subscribe(
  function(e) {
    if (e.newValue) {
      goku_scream_controller.setPlaying(true);
      saiyan_sparks_anim.hidden = false;
      //saiyan_flash_anim.hidden = false;
    } else {
      goku_scream_controller.setPlaying(false);
      goku_scream_controller.reset();
      //saiyan_flash_anim.hidden = true;
      saiyan_sparks_anim.hidden = true;
    }
});

/*
if (!saiyan_flash_anim.hidden) {
  saiyan_flash_anim.hidden = true;
}
if (!saiyan_sparks_anim.hidden) {
  saiyan_sparks_anim.hidden = true;
}
*/
