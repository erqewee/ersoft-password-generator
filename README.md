# Ersoft | Password Generator
- Best password generator!

# Base
- [TypeScript](https://www.typescriptlang.org/)

# Requirements
- [Node 16.x](https://nodejs.org/en/download) or [above](https://nodejs.org/en/download/current)!

# Install
```npm
npm install @ersoft/password-generator
```

with pnpm;
```pnpm
npm install --global pnpm && pnpm install @ersoft/password-generator
```

# Examples

- Creating Passwords
```js
import { Password } from "@ersoft/password-generator";
const gen: Password = new Password({ length: 16 });

// Using defines
const p = gen.generate({});
console.log(p);

// Using normal with log (no define)
gen.generate({ log: true });

// Using defines and log
const p = gen.generate({ log: true });
console.log(p);
```
- Saving Passwords
```js
import { Password, SaveTypes } from "@ersoft/password-generator";
const gen: Password = new Password({ length: 16 });
gen.generate({});

// Using JSON (Provided with wio.db)
gen.save(SaveTypes.JsonDatabase);

// Using YAML (Provided with wio.db)
gen.save(SaveTypes.YamlDatabase)

// Using Localfile
gen.save(SaveTypes.File, "C:\\password.txt"); // path is optional
```

- Personalize Passwords
```js
import { Password, Personalize, Positions } from "@ersoft/password-generator";
const gen: Password = new Password({ length: 16 });
gen.generate({});

// Using personalize with directly
const personalize: Personalize = new Personalize(gen.password);
// Using personalize with custom
const personalize: Personalize = new Personalize("mycoolpassword-thank-you-ersoft");

// Using trim (function)
personalize.trim();

// Using slice (function)
personalize.slice({}); 
personalize.slice({ start: 10, end: 10 }); // start and end is optional 

// Using add (function)
personalize.add("ersoft", Positions.Right); // Center and Left are available in the Positions

// Using index (function)
personalize.index("a", 4); // search the "a" letter in string at position 4 (position is optional)
```

# Support
- You can contact with my Discord [Profile](https://discord.com/users/744835491643260988) or [Server](https://discord.com/)