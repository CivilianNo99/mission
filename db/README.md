# Feature: tasks.
A class representing a real world task.

The class has a "description" property descripting what the task is about.

The class has an "isDone" property indicating whether the task was done yet.

The class

# Feature: tasks view.
A list showing all the tasks that have been created.

The tasks view has a "tasks visibility" setting which allows the user to show some tasks and hide the rest.



Simple todo list.

You can create one or more todo lists.

A todo list has a name and todo items.

A todo item has text and can be done and undone.

When you check a todo item done, it will not be deleted, but, you can choose to hide or show done items.

# Feature two.
A todo item has a creation date, due date, and completion date.

# Feature
You can show the items that are due, say, this hour, today, this week, this month, this year, next hour, next day, next month, or next year.

# Feature
You can show the items that were completed, say, last hour, last day, last week, last month, last year.

# Feature
Sort items by due date in ascending and descending order.

# Feature
Sort items by creation date ascending and descending order.

# Feature
Sort items completion date ascending and descending order.

# Feature
Habits. A habit is an object that automaticall or manually generates tasks.

It can generate tasks every time an x period of time passes.

It can generate tasks every time a task generated bt it is done.

It can generate tasks every week.

It can generate tasks every particular day of week.

It can generate tasks every x number of days.

# Feature
When an item is checked, it scheduls the creation of a number of other items.

For every x period of times passes, one item is created.

User can create a number of clone todo items when the original item is deleted.

User can create a number of clone todo items one time every specified period of time passes starting at a particular point in time.

# Feature
add labels.
there are four labels by default: 
important unimportant needs-to-be-done-quickly
needs-not-to-be-done-quickly

# More features.
# todo
description: cut your nails 
start at: friday
due at: within 24 hours
recure: every friday
win score: +5
loss score: -5

reward system:
  if you do it before due date, you get 5 points
  if you fail to do it, you lose 5 points
  if you do it after due date, you get 1 point

# todo
description: do morning prayer
start at: 4 am
due at: within 1 hours
recure: everyday
reward system:
  if you do it 
win score: +1000
loss score: -1000

# todo
description: clean something in your room
success score: +5
failure score: -5
suggest at: any free time
due at: no due
regenerate: after success or failure
on-failure behaviour: pile up
success conditions:
  - 2 successes or more everyday.

description: clean something in your room
recure: after done
due at: n/a

# More features.
Add success and failure scores
Add dateActive and dateDue