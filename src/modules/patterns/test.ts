import { createPatternSchema } from './patterns.validation.js'


console.log(createPatternSchema.parse({patternName: "new thing"}));
console.log(createPatternSchema.parse({patternName: ""}));
console.log(createPatternSchema.parse({}));