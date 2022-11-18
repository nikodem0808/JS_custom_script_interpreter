
var opf = {};

//
opf['.'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier' && types[r] == 'identifier')
    {
        var temp_res = tokens[l] + '.' + tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'identifier');
    }
    else
    {
        console.log("ERROR/malformed-expression-objacc"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['*'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] * tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else if (types[l] == 'string' && types[r] == 'number')
    {
        var temp_res = '';
        if (tokens[r] < 0)
        {
            tokens[l] = tokens[l].split('').reverse().join('');
            tokens[r] = -tokens[r];
        }
        for (var temp_iter = Math.floor(tokens[r]); temp_iter > 0; temp_iter--)
        {
            temp_res = temp_res + tokens[l];
        }
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'string');
    }
    else if (types[l] == 'number' && types[r] == 'string')
    {
        var temp_res = '';
        if (tokens[l] < 0)
        {
            tokens[r] = tokens[r].split('').reverse().join('');
            tokens[l] = -tokens[l];
        }
        for (var temp_iter = Math.floor(tokens[l]); temp_iter > 0; temp_iter--)
        {
            temp_res = temp_res + tokens[r];
        }
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'string');
    }
    else
    {
        console.log("ERROR/malformed-expression-mult"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['='] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'identifier' && types[r] == 'number')
    {
        ALL[tokens[l]] = tokens[r];
        tokens.splice(l, 3, tokens[l]);
        types.splice(l, 3, 'identifier');
    }
    else if (types[l] == 'identifier' && types[r] == 'string')
    {
        ALL[tokens[l]] = tokens[r];
        tokens.splice(l, 3, tokens[l]);
        types.splice(l, 3, 'identifier');
    }
    else
    {
        console.log("ERROR/malformed-expression-ass"); // DEBUG
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['+'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] + tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else if (types[l] == 'string' && types[r] == 'string')
    {
        var temp_res = tokens[l] + tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'string');
    }
    else
    {
        console.log("ERROR/malformed-expression-add"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['-'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] - tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-sub"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['/'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        if (tokens[r] == 0)
        {
            return "ERROR/division-by-zero";
        }
        var temp_res = tokens[l] / tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-div"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['**'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] ** tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-exp"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['//'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        if (tokens[r] == 0)
        {
            return "ERROR/division-by-zero";
        }
        var temp_res = Math.floor(tokens[l] / tokens[r]);
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-idv"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['%'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        if (tokens[r] == 0)
        {
            return "ERROR/modulo-zero";
        }
        var temp_res = tokens[l] % tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-rem"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['&&'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = (tokens[l] != 0 && tokens[r] != 0) ? 1 : 0;
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-and"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['||'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = (tokens[l] != 0 || tokens[r] != 0) ? 1 : 0;
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-or"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['&'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] & tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-bitand"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['|'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] | tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-bitor"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['^'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] ^ tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-bitxor"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['>>'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] >> tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-bitshr"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['<<'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = tokens[l] << tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-bitshl"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['>'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = (tokens[l] > tokens[r]) ? 1 : 0;
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-grt"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['<'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = (tokens[l] < tokens[r]) ? 1 : 0;
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-les"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['>='] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = (tokens[l] >= tokens[r]) ? 1 : 0;
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-geq"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['<='] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] == 'number' && types[r] == 'number')
    {
        var temp_res = (tokens[l] <= tokens[r]) ? 1 : 0;
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-leq"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['=='] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (tokens[l] == undefined || tokens[r] == undefined) return "ERROR/malformed-expression-equ";
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    var temp_res = (tokens[l] == tokens[r]) ? 1 : 0;
    tokens.splice(l, 3, temp_res);
    types.splice(l, 3, 'number');
    return "SUCCESS";
};

opf['!='] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (tokens[l] == undefined || tokens[r] == undefined) return "ERROR/malformed-expression-equ";
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    var temp_res = (tokens[l] != tokens[r]) ? 1 : 0;
    tokens.splice(l, 3, temp_res);
    types.splice(l, 3, 'number');
    return "SUCCESS";
};

opf['~'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[r] == 'number')
    {
        var temp_res = ~tokens[r];
        tokens.splice(j, 2, temp_res);
        types.splice(j, 2, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-bitneg"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['!'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[r] == 'number')
    {
        var temp_res = (tokens[r] != 0) ? 0 : 1;
        tokens.splice(j, 2, temp_res);
        types.splice(j, 2, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-neg"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};

opf['??'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    if (types[l] == 'identifier')
    {
        var temp_res = evalId(tokens[l]);
        types[l] = temp_res.type;
        tokens[l] = temp_res.value;
    }
    if (types[r] == 'identifier')
    {
        var temp_res = evalId(tokens[r]);
        types[r] = temp_res.type;
        tokens[r] = temp_res.value;
    }
    if (types[l] != 'operator' && types[r] != 'operator' && types[l] != 'keyword' && types[r] != 'keyword' && types[l] != 'ExpSeparator' && types[r] != 'ExpSeparator')
    {
        var temp_res = tokens[l] ?? tokens[r];
        tokens.splice(l, 3, temp_res);
        types.splice(l, 3, 'number');
    }
    else
    {
        console.log("ERROR/malformed-expression-chkdef"); // debug
        return "ERROR/malformed-expression";
    }
    return "SUCCESS";
};
// TODO: add function calls
opf['('] = (tokens, types, j) =>
{
    var k = 1;
    var i = j + 1;
    while (k > 0)
    {
        if (tokens[i] == '(') k++;
        if (tokens[i] == ')') k--;
        if (tokens[i] == EXPRESSION_SEPARATOR) return "ERROR/malformed-expression-parentheses";
        i++;
    }
    var delct = i - j - 2;
    if (delct < 0) return "ERROR/malformed-expression-parentheses";
    var temp_res = evalParsed(tokens.splice(j + 1, delct), types.splice(j + 1, delct));
    tokens.splice(j, 2, temp_res.value);
    types.splice(j, 2, temp_res.type);
    return "SUCCESS";
};

opf['['] = (tokens, types, j) =>
{
    if (types[j - 1] != 'identifier') return "ERROR/cannot-map-non-id";
    var k = 1;
    var i = j + 1;
    while (k > 0)
    {
        if (tokens[i] == '[') k++;
        if (tokens[i] == ']') k--;
        if (tokens[i] == EXPRESSION_SEPARATOR) return "ERROR/malformed-expression-parentheses";
        i++;
    }
    var delct = i - j - 2;
    if (delct < 0) return "ERROR/malformed-expression-evaluable";
    var temp_res = evalParsed(tokens.splice(j + 1, delct), types.splice(j + 1, delct));
    if (temp_res.type == 'identifier')
    {
        temp_res.value = ALL[temp_res.value];
    }
    tokens[j - 1] = tokens[j - 1] + '[';
    tokens.splice(j - 1, 3, tokens[j - 1].concat(temp_res.value));
    tokens[j - 1] = tokens[j - 1] + ']';
    types.splice(j, 2);
    return "SUCCESS";
};
// contains ':' parsing
opf['?'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1, alt = j + 3;
    var p = tokens.indexOf(':', j);
    if (p == -1 || p == j + 1) return "ERROR/invalid-ternary-operator";
    var delct = p - j - 1;
    if (delct <= 0) return "ERROR/malformed-expression-ternary ".concat(delct, ' ', p, ' ', j);
    var temp_res = evalParsed(tokens.splice(r, delct, ''), types.splice(r, delct, ''));
    if (temp_res.type == 'identifier')
    {
        temp_res.value = ALL[temp_res.value];
    }
    tokens[r] = temp_res.value;
    types[r] = temp_res.type;
    if (types[l] == 'identifier')
    {
        tokens[l] = ALL[tokens[l]];
        types[l] = typeof(tokens[l]);
    }
    if (types[alt] == 'identifier')
    {
        tokens[alt] = ALL[tokens[l]];
        types[alt] = typeof(tokens[l]);
    }
    if (tokens[l] != 0)
    {
        temp_res.value = tokens[r];
        temp_res.type = types[r];
    }
    else
    {
        temp_res.value = tokens[alt];
        temp_res.type = types[alt];
    }
    tokens.splice(l, 5, temp_res.value);
    types.splice(l, 5, temp_res.type);
    return "SUCCESS";
};

// TODO: op_assignments













// export { opf }; // CORS??

/*
const operators = [
    '%=', '+=', '-=', '//=', '/=', '**=', '*=', '^=', '|=', '&=', '>>=', '<<=', '?=',
    '.', ',', '(', ')', '[', ']',
    '**', '*', '//', '/', '%', '+', '-',
    '&&', '||',
    '&', '|', '^', '~', '>>', '<<',
    '>', '<', '<=', '==', '>=', '!=',
    '!', '??', '?', ':', '='
];
*/