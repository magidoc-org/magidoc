# Magidoc contributing guide
👋 Hi! We are excited that you decided to contribute to Magidoc. Before you submit your contribution, make sure you read through the following guide.

## Repo setup
Magidoc is a mono-repository using pnpm workspaces. The package manager that must be installed to work on this repository is [pnpm](https://pnpm.io/).

1. To install all dependencies, run `pnpm install` in the root folder. 
2. To build all packages, plugins and templates, run `pnpm build` in the root folder.
3. To run all tests in all packages in all projects, run `pnpm test` in the root folder. 

You can also run these commands in any specific project to run `build` or `test` for a project only. 

When setting up the repository, pre-commit hooks for prettier and eslint will be setup automatically before each commit. The linting is quite intense and committing will not be allowed if linting fails. 
You can always save your ongoing work and skip hooks by performing `git commit -m "<your-message>" --no-verify`.

## IDE setup
The recommended IDE to develop on this project is VSCode. A workspace configuration is available at the root of the project. You may open the [magidoc.code-workspace](./magidoc.code-workspace) file located at the root of the repository in VSCode, and click the _Open Workspace_ button.

Make sure to install the recommended plugins that will be suggested to you if they are not already installed.

## Project structure
Project is structured in the follwing tree
```
root
├── docs (1)
└── packages
    ├── cli (2)
    ├── plugins (3)
    │   ├── query-generator
    │   ├── reverse-schema-mapper
    │   └── ...
    └── starters (4)
        ├── carbon-multi-page
        └── ...
```

1. **docs**: This is the [documentation website](https://magidoc.js.org). It is entirely built with Magidoc and markdown only. If you wish to update the content of the documentation, you can simply update the markdown in there. 
2. **cli**: This is the project containing Magidoc's CLI application. It relies on many of the plugins below, as well as the starters. 
3. **plugins**: Magidoc is plugin-oriented. The folder contains various JavaScript/TypeScript/Svelte plugins that are shared accross different components of Magidoc. Starters use most of these plugins. You can see the readme and tests for each of these projects for more details.
4. **starters**: Starters are the various website templates that Magidoc provides out of the box. You may create your own template with a different UI library, a different layout, different structure, etc. The goal is to provide a wide variety of easy-to-swap templates.

## Opening a merge request
Pull requests by the community are encouraged and highly appreciated. However, there are a few guidelines to follow when opening a PR. 

**Adding a feature**
If you wish to add a feature, you should ideally open an issue first and have it approved before you start working on it. 
- Make sure you link the PR to the issue.
- Make sure tests pass. Otherwise, PR will not be reviewed or merged.
- Ideally, do not reduce test coverage. Try to test everything you add as most as possible.

**Fixing a bug**
- Make sure to raise an issue for the bug and link your PR to it.
- Ideally, make sure there is no regression by adding a test case when fixing the bug.

## Note on dependencies
Magidoc aims to be fast and lightweight as much as possible. If possible, always avoid adding new dependencies. 
If what you need to do is very simple and could be implemented in a few lines of code, then don't bother adding a new dependency for it.


