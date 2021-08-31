class SvgToPngConverter {
  constructor() {
    this._init = this._init.bind(this);
    this._cleanUp = this._cleanUp.bind(this);
    this.convertFromInput = this.convertFromInput.bind(this);
  }

  _init() {
    this.canvas = document.createElement("canvas");
    this.imgPreview = document.createElement("img");
    this.imgPreview.style = "position: absolute; top: -9999px";

    document.body.appendChild(this.imgPreview);
    this.canvasCtx = this.canvas.getContext("2d");
  }

  _cleanUp() {
    document.body.removeChild(this.imgPreview);
  }

  convertFromInput(svg) {
    this._init();
    let _this = this;

    return new Promise((resolve, reject) => {
      _this.imgPreview.onload = function() {
        const img = new Image();
        _this.canvas.width = svg.clientWidth;
        _this.canvas.height = svg.clientHeight;
        img.crossOrigin = "anonymous";
        img.src = _this.imgPreview.src;
        img.onload = function() {
          _this.canvasCtx.drawImage(img, 0, 0);
          let imgData = _this.canvas.toDataURL("image/png");
          _this._cleanUp();
          resolve(imgData);
        };
      };
      _this.imgPreview.onerror = reject;

      const svgAsXML = new XMLSerializer().serializeToString(svg);
      _this.imgPreview.src =
        "data:image/svg+xml," + encodeURIComponent(svgAsXML);
    });
  }
}

module.exports = SvgToPngConverter;
