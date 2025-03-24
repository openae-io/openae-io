# Feature extraction algorithms

Feature extraction is the process of transforming raw data into a set of features that are relevant for a given problem.
It is a process of dimensionality reduction while preserving as much information as possible about the raw data.

This is an important step for high-volume data like from acoustic emission or structure-borne sound measurements.
Especially if rare events like failures should be detected, the data sets of failure cases are usually rare and not sufficient to train models with the raw sensor data directly (deep learning).
The more dimensions the data has, the more data is needed to training data is needed. This is known as the [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality#Machine_learning).

National and international standards like [ISO 12716:2001](https://www.iso.org/standard/34090.html) and [ASTM E1316-17](https://doi.org/10.1520/E1316-17) define AE features such as *amplitude*, *duration*, *rise time*, *counts* and *energy*. These features, which focus on time-domain characteristics of the signal, are typically computed directly by acoustic emission measurement systems and can be processed in real-time, even with technology from 40 years ago. However, research has shown that incorporating advanced features including the frequency domain can significantly improve model robustness and accuracy in applications like condition monitoring and structural health monitoring. Many of the features are directly inspired by research from fields such as vibration analysis, speech recognition, and music information retrieval.

OpenAE defines [feature extraction algorithms](./latest/) specifically tailored for acoustic emission in form of an open standard.
All definitions are managed and versioned in a GitHub repository https://github.com/openae-io/features.
Each algorithm is unique identified with an `ID`.

## Criteria

The algorithms are selected based on the following criteria:

- Algorithms must be documented in a scientific paper.
- Algorithms should yield consistent results regardless of the sampling rate used during data acquisition.
- Algorithms should handle signals of varying lengths or durations, supporting threshold-based, duration-adapted acquisition.
- Algorithms should be robust: Minor variations in the signal should not significantly impact the results.
- Algorithms that describe frequency domain characteristics should remain independent of the signal's total amplitude and energy.

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
