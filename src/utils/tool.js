function Obj2style(style){
    let str = [];
    Object.keys(style).forEach(key => {
      str.push(`${key}:${style[key]};`);
    });
    return str.join(";");
};

export{
    Obj2style
}