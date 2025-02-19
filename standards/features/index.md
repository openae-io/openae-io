# Feature extraction algorithms

Feature extraction is the process of transforming raw data into a set of features that are relevant for a given problem.
It is a process of dimensionality reduction while preserving as much information as possible about the raw data.

This is an important step for high-volume data like from acoustic emission or structure-borne sound measurements.
Especially if rare events like failures should be detected, the data sets of failure cases are usually rare and not sufficient to train models with the raw sensor data directly (deep learning).
The more dimensions the data has, the more data is needed to training data is needed. This is known as the [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality#Machine_learning).

OpenAE defines [feature extraction algorithms](./latest/) in form of an open standard.
All definitions are managed and versioned in a GitHub repository https://github.com/openae-io/features.
Each algorithm is unique identified with an `ID`.

## Versioning

OpenAE uses [semantic versioning](https://semver.org/).
Feature extraction algorithms are versioned as a set, allowing implementations to reference a specific version.
The patch number is only used for the implementations.

```
v1.2.3
 │ │ │
 │ │ └── patch (bug fixes)
 │ └──── minor (non-breaking changes like algorithm additions)
 └────── major (breaking changes)
```

### Rules

- Changes of the algorithm definitions or its parameters are **major/breaking changes** (`v1.0.0` -> `v2.0.0`)
- New algorithms are handled as **minor changes** (`v1.0.0` -> `v1.1.0`)
- Patches are not used for the algorithms definitions but only its implementations, e.g. for bug fixes (`v1.0.0` -> `v1.0.1`)
- Additions to the algorithm descriptions, e.g. a new reference, do not change the version
