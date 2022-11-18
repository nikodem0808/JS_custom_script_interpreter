var cons = document.createElement("textarea");
document.body.appendChild(cons);
cons.setAttribute('spellcheck', 'false');
cons.setAttribute('id', 'MainConsole');
//
var style = {};
//
var slider = document.createElement('input');
document.body.appendChild(slider);
slider.setAttribute('type', 'range');
slider.setAttribute('min', '8');
slider.setAttribute('max', ' 72');
slider.setAttribute('value', '14');
slider.setAttribute('style', 'width: 200px;');
//
var fonts = [
    'Default',
    'Thin',
    'Slim',
    'Doodle',
    'Tek',
    'Handwritten',
    'Inconsolata',
    'Plex',
    'Project3D',
    'Orbit',
    'Noon',
    'Space',
    'Source',
    '8-BIT',
    'Slick'
];
var selection = document.createElement('select');
document.body.appendChild(selection);
for(var font of fonts)
{
    var copt = document.createElement('option');
    selection.appendChild(copt);
    copt.innerHTML = font;
    copt.value = font;
}
//

function Update()
{
    var r = '';
    for (var key in style)
    {
        if (key == 'font-size')
        {
            r = r + `${key}: ${style[key]}px;`;
        }
        else if (style[key] != null && style[key] != undefined)
        {
            r = r + `${key}: ${style[key]};`;
        }
    }
    cons.setAttribute('style', r);
}

slider.addEventListener('change', () => {
    var val = slider.value;
    style['font-size'] = val;
    Update();
});

selection.addEventListener('change', () => {
    var val = selection.value;
    style['font-family'] = '"' + val + '"';
    Update();
});