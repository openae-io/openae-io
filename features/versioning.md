# Versioning

OpenAE uses [semantic versioning](https://semver.org/):

```
v1.2.3
 │ │ │
 │ │ └── patch (bug fixes)
 │ └──── minor (non-breaking changes like algorithm additions)
 └────── major (breaking changes)
```

The feature extraction algorithms are versioned as a set of features so implementations can refer to a specific version of OpenAE features.
The patch number is only used for the implementations.

::: info
The first version `v1.0.0` is planed for Dezember 2023.
:::

## Rules

- Changes of the algorithm definitions or its parameters are **major/breaking changes** (`v1.0.0` -> `v2.0.0`)
- New algorithms are handled as **minor changes** (`v1.0.0` -> `v1.1.0`)
- Patches are not used for the algorithms definitions but only its implementations, e.g. for bug fixes (`v1.0.0` -> `v1.0.1`)
- Additions to the algorithm descriptions, e.g. a new reference, do not change the version
