# Contributing to Afiado

Thank you for your interest in contributing to Afiado! We welcome contributions from everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before proceeding.

## How Can I Contribute?

### Reporting Bugs

- Before submitting a bug report, please check the existing issues to avoid duplicates
- Use the bug report template when creating a new issue
- Include as much detail as possible:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Screenshots if applicable
  - Your environment (OS, browser version, etc.)

### Suggesting Enhancements

- Explain the problem you're trying to solve
- Describe the solution you'd like
- Consider alternatives you've thought about

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass (`bun test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

#### Pull Request Guidelines

- Follow the coding style and conventions, see [ARCHITECTURE.md](./ARCHITECTURE.md)
- Update documentation as needed
- Include tests for new features and bug fixes
- Maintain or improve test coverage
- One pull request per feature
- Keep pull requests focused in scope
- Reference any relevant issues

## Development Setup

1. Clone the repository
2. Install dependencies: `bun install`
3. Set up environment variables: `cp .env.example .env`
4. Start development server: `bun run dev`
5. Run tests: `bun run test`

## Testing Guidelines

- Write tests for all new features and bug fixes
- Follow the testing pyramid: unit → integration → e2e
- Test both success and error cases
- Keep tests focused and well-organized
- Use meaningful test descriptions
- Mock external dependencies appropriately
- Aim for high test coverage on critical paths

## Style Guidelines

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write comments in English and text rendered in the UI in Portuguese
- Follow rule [react/jsx-no-literals](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md)
    - Not yet available in Biome, see @ https://github.com/biomejs/biome/discussions/3#discussioncomment-12013898
- Keep functions focused and small

## Documentation

- Keep [README.md](./README.md) and [ARCHITECTURE.md](./ARCHITECTURE.md) up to date
- Document new features
- Include JSDoc comments for functions

## Need Help?

- Check out the [documentation](https://afiado.app.br/docs)
- Ask questions in [Discussions](https://github.com/tmtecnologia/afiado/discussions)

## License

By contributing to Afiado, you agree that your contributions will be licensed under [GNU General Public License v3.0](./COPYING).
