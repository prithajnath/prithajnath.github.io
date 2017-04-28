//files
let files = ["about.txt" ,"education.txt"  ,"experience.txt", "languages.txt", "frameworks.txt",
        "vcs.txt", "aws.txt", "contact.txt"];

//Info
let Info = {
    "about.txt":`I am Prithaj, a CS student at SUNY Plattsburgh. I love web development and dank
    memes`,
    "education.txt":"Computer Science,BS, SUNY Plattsburgh 2017",
    "experience.txt":"Jr. Web Developer, End Point Corp: May - Aug 2016",
    "languages.txt":"Python,Ruby,HTML,CSS and JavaScript",
    "frameworks.txt":"Ruby on Rails,Django,Bootstrap,JQuery,React.js,Node.js,Paper.js",
    "aws.txt":"Lambda,Certificate Manager,Route53",
    "vcs.txt":"Git",
    "contact.txt":"Email: prithajnath@gmail.com, Twitter:prithajnath, GitHub: prithajnath"
}

//Key Mappings
let KeyCodes = {
    81:"q",
    87:"w",
    69:"e",
    82:"r",
    84:"t",
    89:"y",
    85:"u",
    73:"i",
    79:"o",
    80:"p",
    219:"[",
    221:"]",
    220:"\\",
    65:"a",
    83:"s",
    68:"d",
    70:"f",
    71:"g",
    72:"h",
    74:"j",
    75:"k",
    76:"l",
    186:";",
    222:"'",
    90:"z",
    88:"x",
    67:"c",
    86:"v",
    66:"b",
    78:"n",
    77:"m",
    188:",",
    190:".",
    191:"/",
    32:" "
};

module.exports = {
    files: files,
    KeyCodes: KeyCodes,
    Info: Info
}