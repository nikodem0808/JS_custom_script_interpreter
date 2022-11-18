var inp = document.getElementById('MainConsole');
//
//
const idStarts = ['_', '$', '@', '#'];
const operators = [
    '%=', '+=', '-=', '//=', '/=', '**=', '*=', '^=', '|=', '&=', '>>=', '<<=', '?=',
    '.', ',', '(', ')', '[', ']',
    '**', '*', '//', '/', '%', '+', '-',
    '&&', '||',
    '&', '|', '^', '~', '>>', '<<',
    '>', '<', '<=', '==', '>=', '!=',
    '!', '??', '?', ':', '='
];
const precedence_groups = [
    ['.', '(', '['],
    ['!', '~', '??'],
    ['?'],
    ['**'],
    ['>>', '<<'],
    ['*', '//', '/'],
    ['%'],
    ['+', '-'],
    ['&', '|', '^'],
    ['>=', '>', '<=', '<', '==', '!='],
    ['&&'],
    ['||'],
    ['=', '%=', '+=', '-=', '//=', '/=', '**=', '*=', '^=', '|=', '&=', '>>=', '<<=', '?=']
];
var opf, kws; // initialized on import
const delimiters = [' ', '\n'];
const EXPRESSION_SEPARATOR = ';';

import('./keywords.js').then((x) => {
    kws = x.kws;
});
import('./ops.js').then((x) => {
    opf = x.opf;
    window.addEventListener("keydown", handleClick);
});

var keywords = ['BLTIN', 'new'];
//

function isAlpha(x)
{
    return ((x >= 'a') && (x <= 'z')) || ((x >= 'A') && (x <= 'Z'));
}
function isDigit(x)
{
    return (x >= '0') && (x <= '9');
}
function isHexit(x)
{
    return isDigit(x) || ((x >= 'a') && (x <= 'f'));
}
function isIdStart(x)
{
    return isAlpha(x) || (idStarts.indexOf(x) != -1);
}
function isIdBody(x)
{
    return isIdStart(x) || isDigit(x);
}
function isDec(x)
{
    if (x[0] == '-') x = x.substr(1);
    var j = x.indexOf('.');
    if (j != -1)
        if (x.lastIndexOf('.') != j) return false;
        else x[j] = '0';
    for (var i in x) if (!isDigit(x[i])) return false;
    return true;
}
function isHex(x)
{
    if (x[0] == '-') x = x.substr(1);
    var j = x.indexOf('.');
    if (j != -1)
        if (x.lastIndexOf('.') != j) return false;
        else x[j] = '0';
    for (var i in x) if (!isHexit(x[i])) return false;
    return true;
}
function isNum(x)
{
    return isHex(x) || isHex(x);
}

var read = "";
var conv = [];
var parsed = [];
//
var ALL = {};
var TEMPS = {};
var NTEMPS = 0;


//
function reduceDelimiters(tx, delims)
{
    while (delims.indexOf(tx[0]) != -1)
    for (var i in delims) 
    {
        var g = 0;
        while (tx[g] == delims[i])
        {
            g++;
        }
        tx = tx.substr(g);
    }
    return tx;
}
//
function evalId(x) // TODO: review
{
    var p;
    var r = {};
    if ((p = x.indexOf('[')) != -1)
    {
        if (x.lastIndexOf(']') == -1)
        {
            console.log("ERROR/unmatched-square-bracket")
            return { type: 'undefined', value: undefined };
        }
    }
    r = {
        value: ALL[x],
        type: typeof(ALL[x])
    }
    return r;
}
// possible token types: number | string | undefined | keyword | identifier | operator | ExpSeparator
function ParseText(tx) // returns tokens and their types from a string
{
    var types = [];
    var tokens = [];
    var neg = false;
    tx = reduceDelimiters(tx, delimiters) + delimiters[0];
    //
    var next = false;
    for (; tx.length > 0;)
    {
        console.log(tx, '\\', tx[0]); // DEBUG
        for (var i in keywords) // keyword check
        {
            if (tx.startsWith(keywords[i]) && !isIdBody(tx[keywords[i].length]))
            {
                tx = tx.substr(keywords[i].length);
                tokens.push(keywords[i]);
                types.push('keyword');
                next = true;
                break;
            }
        }
        if (tx[0] == '"') // string literal check // TODO: add escape checking
        {
            tx = tx.substr(1);
            var t = '';
            while (tx[0] != '"' && tx.length > 0)
            {
                t = t + tx[0];
                tx = tx.substr(1);
            }
            if (tx[0] == '"') tx = tx.substr(1);
            else return { header: "ERROR/unmatched-double-quotes", info: t };
            tokens.push(t);
            types.push('string');
            continue;
        }
        if (isIdStart(tx[0])) // identifier check
        {
            var t = tx[0];
            tx = tx.substr(1);
            while (isIdBody(tx[0]))
            {
                t = t + tx[0];
                tx = tx.substr(1);
            }
            types.push('identifier');
            tokens.push(t);
            continue;
        }
        if (tx[0] == '-' && types[types.length - 1] != 'identifier' && types[types.length - 1] != 'number' && isDigit(tx[1])) // negative sign for number literal check
        {
            neg = true;
            tx = tx.substr(1);
        }
        if (isDigit(tx[0])) // unsigned number literal check
        {
            var t = tx[0];
            if (neg)
            {
                t = '-' + t;
                neg = false;
            }
            var _dec = false;
            tx = tx.substr(1);
            while (isDigit(tx[0]) || (tx[0] == '.'))
            {
                t = t + tx[0];
                if (tx[0] == '.')
                    if (!_dec) _dec = true;
                    else return { header: "ERROR/multiple-decimal-points-not-allowed", info: t };
                tx = tx.substr(1);
            }
            if (isIdBody(tx[0])) return { header: "ERROR/trailing-data-after-number-literal", info: (t + tx[0]) };
            types.push('number');
            tokens.push(Number.parseFloat(t));
            continue;
        }
        if (tx[0] == EXPRESSION_SEPARATOR) // separator check
        {
            types.push('ExpSeparator');
            tokens.push(EXPRESSION_SEPARATOR);
            tx = tx.substr(1);
            continue;
        }
        for (var op in operators) // operator check
        {
            if (tx.startsWith(operators[op]))
            {
                tokens.push(operators[op]);
                types.push('operator');
                tx = tx.substr(operators[op].length);
                next = true;
                break;
            }
        }
        if (delimiters.indexOf(tx[0]) != -1) // delimiter check
        {
            tx = reduceDelimiters(tx, delimiters);
            continue;
        }
        if (tx[0] != undefined && !next)
        {
            return { header: "ERROR/forbidden-character", info: tx[0] };
        }
        next = false;
    }
    //
    return {
        header: "Success",
        info: "Success",
        parsed_types: types,
        parsed_tokens: tokens
    };
}
//
function evalParsed(tokens, types)
{
    while (tokens.length > 1)
    {
        console.log(tokens, '\n', types); // DEBUG
        var j;
        //
        for (var grp in precedence_groups)
        {
            while (true)
            {
                var nops = [];
                for (var op in precedence_groups[grp])
                {
                    var lk = tokens.indexOf(precedence_groups[grp][op]);
                    if (lk != -1) nops.push(lk);
                }
                if (nops.length == 0) break;
                j = Math.min(...nops);
                //console.log(tokens[j], '\n\n\n', j, '\n\n\n', nops); // DEBUG
                var opres = opf[tokens[j]](tokens, types, j);
                if (opres.toUpperCase().includes('ERROR'))
                {
                    console.log(opres); // DEBUG;
                    return opres;
                }
            }
        }
        //
        while ((j = tokens.indexOf(EXPRESSION_SEPARATOR)) != -1) // resolve unhandled exp_separators (always try to split the expression before parsing &/ evaluating)
        {
            l = j - 1;
            if (l == -1)
            {
                tokens.splice(0, 1);
                types.splice(0, 1);
                continue;
            }
            if (l == 0 || tokens[l - 1] == EXPRESSION_SEPARATOR)
            {
                if (types[l] == 'identifier') console.log(evalId(tokens[l]));
                else console.log(tokens[l]);
                tokens.splice(l, 2);
                types.splice(l, 2);
            }
            else break;
        }
        //
        for (var i = 1; i < types.length; i++) // check for misplaced tokens
        {
            if ((types[i - 1] == 'identifier' || types[i - 1] == 'number' || types[i - 1] == 'string') && (types[i - 1] == 'identifier' || types[i - 1] == 'number' || types[i - 1] == 'string'))
            {
                console.log(tokens, "ERROR/misplaced-token"); // DEBUG
                return "ERROR/misplaced-token";
            }
        }
    }
    return {
        type: types[0],
        value: tokens[0]
    };
}
function evalExp(x)
{
    var result = ParseText(x);
    if (result.header.toUpperCase().includes('ERROR'))
    {
        console.log(result.header, ' :info: ', result.info); // DEBUG
        return;
    }
    var tokens = result.parsed_tokens;
    var types = result.parsed_types;
    //
    return evalParsed(tokens, types);
}
//

function handleClick(e)
{
    //console.table(e);
    if (e.key != "Alt") return;
    read = inp.value;
    console.log("RAW\n", read, '\n-----'); // DEBUG
    conv = read.split(EXPRESSION_SEPARATOR);
    for (var i in conv)
    {
        console.log(conv[i], '\n', i, ' ret-> ', evalExp(conv[i]));
    }
}


