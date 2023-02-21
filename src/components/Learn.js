fetch("./example.txt").then(r=>r.text()).then(txt=>{
    const xml = new DOMParser().parseFromString(
        txt,'text/html'),
      result = txt.split(' ')

    console.log(result);
});
