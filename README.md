# Storybook-GPT

Storybook-GPT is a tool designed to automate the creation of Storybook stories for React components. 
The tool leverages the power of GPT-4 to generate clean, readable, and standardized story code. This generated code adheres strictly to CSF3 (Component Story Format 3) conventions.
The package currently support only Typescript file generation.

## Installation

```bash
pnpm i storybook-gpt
```

## Usage
You have to provide an OpenAi key through a env variable

```
OPENAI_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Then you can generate your stories with the following command

```bash
pnpm run storybook-gpt
```

## Configuration

A `storybook-gpt-config.json` file must be created before launching the script.

The config file accept the following properties:
 
- components: the path where your components live
- stories: the path where your stories live
- exclude: an array of regex defining paths/files to be excluded when reading components

Example:
```
{
  "components": "components",
  "stories": "storybook",
  "exclude": ["ui"]
}
``` 


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)