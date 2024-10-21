# Marching Order

A Foundry VTT implementation for the Marching Order TTRPG

This is in alpha and being developed by one person who is new to Javascript and development and doing this as a hobby. Everything in the system is subject to change and videos on use will hopefully be made as a guide. It all depends on how much time I have.

I am open to suggestions as I have no experience in UI design and have little to no idea what works well.

**Known Issues**
No hard limit to inventory slots. The system will allow adding more items than a character has inventory slots for.
Always leaves one torch in inventory even after clicking "Light new torch". Also does not handle multiple torch items. Please increase the quantity of Torches rarther than have multiple rows with torch items.

**Conditions**: They are currently all manual. I hope to implement active effects and have it automatically apply the bonus/penalty and reduce with combat tracker but that is not currently the case.

**Combat**: Initiative and combat order does not work as you might expect. The best solution currently is to ignore the turn order and combat round utilities in Foundry, or to roll 1d6 for Rogues and Monsters and then setting all the Rogues to that number, and all the Monsters to the other number in the combat tracker. Eventually I'll work on implementing combat tracking correctly to be reorderable and all that. I hope to integrate it with cooldown dice, conditions and all that. Currently that is a little over my head at the moment.

At some point I'd also like to be able to automate attacks and be able to "target" a rogue or monster, roll the attack and have it compare and automatically deal damage.

**Cooldown Dice**: Currently after using an ability with a non-zero cooldown, you'll need to set the timer to max and reduce it each turn. Again, I plan to integrate this with the combat tracker to automatically reduce when their turn comes.

**Half Rolls**: Hold the Shift key. This totals the result before halfing so this doesn't work quite well for damage rolls that are supposed to be halfed as I understand those are compared to the result, then the actual damage delt is halved.
