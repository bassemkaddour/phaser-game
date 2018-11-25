class LoadingScene extends Phaser.Scene {
  constructor() {
    super({key: 'LoadingScene'});
  }

  init (data) {
    this.level_data = data.level_data;
    console.log("Loading Scene data:", data)
  }

  preload () {
    let assets = this.level_data.assets;
    for (let asset_key in assets) {
      let asset = assets[asset_key];
      switch (asset.type) {
        case 'image':
          this.load.image(asset_key, asset.source);
          break;
        case 'spritesheet':
          this.load.spritesheet(asset_key, asset.source, {frameWidth: asset.frame_width, frameHeight: asset.frame_height, frames: asset.frames, margin: asset.margin, spacing: asset.spacing});
          break;
        case 'tilemap':
          this.load.tilemapTiledJSON(asset_key, asset.source);
          break;
      }
    }
  }

  create (data) {
    this.hideGazette();
    this.scene.start(data.scene, {level_data: this.level_data, next_level: data.next_level});
  }

  hideGazette() {
    const gazette = document.querySelector('.results');
    gazette.style.display = "none";
  }

}

export default LoadingScene;