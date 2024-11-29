import readline from 'readline';

async function loadGreeting(language) {
  let greeting;

  const greetingsMap = {
    'en': './greeting_en.js',
    'ru': './greeting_ru.js',
    'zh': './greeting_zh.js',
    'hi': './greeting_hi.js',
    'pt': './greeting_pt.js'
  };
  
  if (greetingsMap[language]) {
    greeting = await import(greetingsMap[language]);
  } else {
    console.log("Unsupported language");
    return;
  }

  console.log(greeting.default);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter language code: ", (language) => {
  loadGreeting(language);
  rl.close();
});