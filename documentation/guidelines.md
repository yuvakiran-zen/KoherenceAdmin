Program Schema looks like this:

_id
67ee4e0bb6228b3118d3a18c
name
"Mindfulness Fundamentals"
description
"A comprehensive introduction to mindfulness practices designed for beg…"
imageUrl
"https://storage.googleapis.com/koherence/ChatGPT%20Image%20Apr%203%2C%…"
entryFee
0

routines
Array (2)
0
"67efd98d32ce054f7a194bee"
1
"67efdaab32ce054f7a194bfa"
startDate
2025-04-10T00:00:00.000+00:00
endDate
2025-05-01T00:00:00.000+00:00
startTime
"06:00"
endTime
"20:00"

registeredUsers
Array (14)
0
"67ee7a19c11f0bbd0b2f35e9"
1
"77bf0cf4-9a83-467f-95c7-a58242cef6a5"
2
"eeab12a5-4f16-46e5-a489-bf60591b54fe"
3
"06dca9ef-8e58-40ef-9b0a-8e484b70e7cb"
4
"2a0c511d-4eca-4d14-847f-cd36b1cf09e7"
5
"2cd86676-6823-4a2d-bc9d-0a11364a3df3"
6
"ec6ac0d8-0972-43ff-814f-262f2110190f"
7
"c6f662c4-5f24-4172-a5b2-9e90e47a95de"
8
"2a089874-0c34-4b68-86b6-348ff837904f"
9
"2806afec-10ff-44c2-85d3-5dd881f6df76"
10
"b8a7f762-7bc3-495f-b9ff-b8e36b45d61e"
11
"2e12c602-0b69-4d86-90eb-36e35778dbb9"
12
"82d40d9c-a289-4d1e-a7d0-84f6778536ce"
13
"e794cb5a-e58b-4f74-86c9-368d235cf74b"
category
"meditation"
difficulty
"beginner"

instructors
Array (1)
0
"Sai Krupa Sagar"

tags
Array (6)
0
"mindfulness"
1
"meditation"
2
"beginner"
3
"stress-reduction"
4
"present-moment"
5
"awareness"
isActive
true
createdAt
2025-04-03T08:59:55.327+00:00
updatedAt
2025-04-16T08:42:32.232+00:00
__v
0

Routines schema looks like this:


_id
67efd98d32ce054f7a194bee
name
"Morning Meditation"
description
"Morning Meditation Routine"
imageUrl
"https://images.unsplash.com/photo-1677177947563-1f81ac84b3cb?fm=jpg&q=…"

steps
Array (2)
0
67efdd4032ce054f7a194bfe
1
67efe29c32ce054f7a194c34
program
67ee4e0bb6228b3118d3a18c
scheduledDateTime
2025-04-28T13:13:44.510+00:00
duration
19
category
"meditation"
difficulty
"beginner"
recommendedTime
"morning"
isRequired
true
order
1
createdAt
2025-04-04T13:07:25.027+00:00
updatedAt
2025-04-04T13:46:04.101+00:00

Steps schema looks like this:

_id
67efdd4032ce054f7a194bfe
name
"Emptiness Meditation Guided"
description
"Emptiness Meditation Guided"
type
"meditation"

content
Object
type
"audio"
url
"https://storage.googleapis.com/koherence/Emptiness%2BMeditation%2BEast…"
routine
67efd98d32ce054f7a194bee
order
1
isRequired
true
createdAt
2025-04-04T13:23:12.986+00:00
updatedAt
2025-04-04T13:23:12.986+00:00
__v
0

