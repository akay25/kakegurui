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

  convertFromInput(svg, callback) {
    this._init();
    let _this = this;
    this.imgPreview.onload = function() {
      const img = new Image();
      _this.canvas.width = svg.clientWidth;
      _this.canvas.height = svg.clientHeight;
      img.crossOrigin = "anonymous";
      img.src = _this.imgPreview.src;
      img.onload = function() {
        _this.canvasCtx.drawImage(img, 0, 0);
        let imgData = _this.canvas.toDataURL("image/png");

        if (typeof callback == "function") {
          callback(imgData);
        }
        _this._cleanUp();
      };
    };

    const svgAsXML = new XMLSerializer().serializeToString(svg);
    this.imgPreview.src = "data:image/svg+xml," + encodeURIComponent(svgAsXML);
  }
}

module.exports = SvgToPngConverter;
