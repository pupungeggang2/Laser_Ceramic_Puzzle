# Design

## How to play

- WASD and arrow keys to move.
- Q undo.
- E interact.
- R restart.

- Objective: Move player to goal. (Most of the stages should make the laser gate open.)

## Objects

- Wall: A solid object which is not pushable.
- Box: A solid object which is pushable.
- Gate: A solid object which is not pushable, the gates will be open if the laser condition is matched.
- Laser emitter: A solid object which emits laser. Sum of number passing the ray should match the condition.
- Number block: A solid object which have number.
- Mirror: A solid object which can change the driection of the light.
- Light portal: A non-Solid object which teleports the ray.

## Level Structure

- All the game begins with the hub level, the overall objective of the game is clearing the hub level.
- The hub level contains some of the signs which has some tutorials.

- Hub
- - Basic
- - Fire
- - Water
- - Wind
- - Earth
- - Light
- - Dark