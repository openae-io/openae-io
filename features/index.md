# Feature extraction algorithms

Feature extraction is the process of transforming raw data into a set of features that are relevant for a given problem.
It is a process of dimensionality reduction while preserving as much information as possible about the raw data.

This is an important step for high-volume data like from acoustic emission or structure-borne sound measurements.
Especially if rare events like failures should be detected, the data sets of failure cases are usually rare and not sufficient to train models with the raw sensor data directly (deep learning).
The more dimensions the data has, the more data is needed to training data is needed. This is known as the [curse of dimensionality](https://en.wikipedia.org/wiki/Curse_of_dimensionality#Machine_learning).

OpenAE provides an open standard of [feature extraction algorithms](/features/latest/).
Algorithms are identified by an `ID` and a [version](versioning).

[Why do we need standardized features?](/project/goals)
