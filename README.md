# bpd-event-bus
Simple event library for Javascript.

# Basics
Library can be used everywhere inside of application.
It provides layer to exchange data between objects.

## Policy
Bus policy controls task preformer behavior. Performer's job is to call each eligible callback attached to the event that is being emitted.
By default, there are two built-in behaviors. **Simple** option executes callback one by one, waiting until current callback finishes before calling next one. This may be a bottleneck, when there are many callbacks attached to event, specially if some of them are long-running. So it is important to keep callback logic as lightweight as possible. Solution for larger number of callbacks may be as second option in performer behavior. **Tasked** performer invokes all callbacks at once and waits until all of them finish or fail before finishing. This however may cause issues in cases where callback execution order matters.

For more fine tuned, specialized behavior there is an API option to create custom implmentation of a task performer.

## Handling
Event handler controls events emits queue. At
### Basic
### Extended

# Usage

To create event bus object call factory create method

```
BpdEventBusFactory.create()
```

This create object with default settings. If you want to control object behavior, you can pass setup object to create:

```
BpdEventBusFactory.create(setup?: BpdEventBusSetup)
```

Where BpdEventBusSetup:
* name - string - optional - gives a name to object. May be useful in case of multiple objects used across the same application.
* logger - BpdEventLogger - optional - callback which captures logs from event bus object: errors and common informations.
* policy - "simple" | "tasked" - optional - controls how performer shall execute callbacks attached to event.
* handling - "basic" | "extended" - optional - controls how handler manage events emits queue.