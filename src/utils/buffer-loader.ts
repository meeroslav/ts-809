export class BufferLoader {
  context: AudioContext;
  urlList: string[];
  callback: Function;
  bufferList = Array(0);
  loadCount = 0;

  constructor(context: AudioContext, urlList: string[], callback: Function) {
    this.context = context;
    this.urlList = urlList;
    this.callback = callback;
  }

  loadBuffer(url: string, index: number): void {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      // Asynchronously decode the audio file data in request.response
      return this.context.decodeAudioData(
        request.response,
        buffer => {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          this.bufferList[index] = buffer;
          if (++this.loadCount == this.urlList.length) {
            this.callback(this.bufferList);
          }
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    };

    request.onerror = () => {
      alert('BufferLoader: XHR error');
    };

    request.send();
  }

  load(): void {
    for (let i = 0; i < this.urlList.length; ++i) {
      this.loadBuffer(this.urlList[i], i);
    }
  }
}
