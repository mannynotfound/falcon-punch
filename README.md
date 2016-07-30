# falcon-punch

An experiment in detecting punches using the [Myo armband](https://www.myo.com/).

# How it Works

User places the Myo armband around their forearm, and the script listens to the gyrometer inside to
calculate differences in z-depth after movements. If a certain z threshold is passed, the script
will trigger a "punch" callback that can then be used to do whatever. 

The detection "algorithm" is pretty basic atm and still a work in progress to get accurate punch detection.
