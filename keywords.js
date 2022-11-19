var kws = {};

kws['new'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    return "SUCCESS";
};

kws['function'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    var rfn = {};
    var i;
    if (types[r] != 'identifier' || (tokens[r + 1] != '(' && types[r + 1] == 'operator')) return "ERROR/malformed-function-header";
    rfn.name = tokens[r];
    var args = [];
    for (i = r + 2; types[i] == 'identifier' ; i++)
    {
        args.push(tokens[i]);
        if (types[i + 1] == 'operator' && tokens[i + 1] == ',' && types[i + 2] == 'identifier') i++;
        else if (tokens[i + 1] == ')' && types[i + 1] == 'operator')
        {
            break;
        }
        else return "ERROR/malformed-function-definition";
    }
    if (tokens[i + 1] != ')' && types[i + 1] == 'operator') return "ERROR/malformed-function-header";
    i = i + 2;
    if (tokens[i] != '{' || types[i] != 'operator') return "ERROR/malformed-function-body";
    //
    return "SUCCESS";
};

kws['if'] = (tokens, types, j) =>
{
    var l = j - 1, r = j + 1;
    return "SUCCESS";
};














//export { kws }; // CORS??