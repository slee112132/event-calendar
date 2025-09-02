use('app');
db.dropDatabase();
db.createCollection('events');

db.events.insertMany([
  {
    name: "Community Picnic",
    date: new Date("2023-07-04T12:00:00Z"),
    location: "Central Park",
    description: "A gathering for the community to enjoy food, games, and conversation.",
    numberOfAttendees: 75,
    imageURI: "/images/Community-Picnic.png",
    // Source: Chat GPT
    type: "Meetup",
    extended: "Join neighbors for a fun day in the park with picnic blankets, potluck dishes, and lawn games for all ages. Enjoy live acoustic music, meet local clubs and organizations, and make new friends while soaking up the sunshine."
  },
  {
    name: "Local Art Show",
    date: new Date("2023-07-10T18:00:00Z"),
    location: "Downtown Art Gallery",
    description: "Exhibition of local artists and their work.",
    numberOfAttendees: 40,
    imageURI: "/images/Local-Art-Show.png",
    // Source: Chat GPT
    type: "Festival",
    extended: "Experience a vibrant display of paintings, sculptures, and mixed-media works created by talented local artists. Mingle with the creators during the opening reception, enjoy light refreshments, and discover unique pieces available for purchase."
  },
  {
    name: "Music Festival",
    date: new Date("2023-08-15T16:00:00Z"),
    location: "Riverfront Park",
    description: "Enjoy live music performances by local bands.",
    numberOfAttendees: 150,
    imageURI: "/images/Music-Festival.png",
    // Source: Chat GPT
    type: "Festival",
    extended: "Spend an afternoon by the river enjoying high-energy performances across multiple stages from emerging and established bands. Sample gourmet food trucks, browse artisan vendors, and soak in a variety of genres from indie rock to folk and jazz."
  },
  {
    name: "Farmers Market",
    date: new Date("2023-07-07T08:00:00Z"),
    location: "Market Square",
    description: "Fresh produce and artisan goods from local vendors.",
    numberOfAttendees: 200,
    imageURI: "/images/Farmers-Market.png",
    // Source: Chat GPT
    type: "Meetup",
    extended: "Browse an array of fresh, locally grown produce, homemade preserves, artisan cheese, and handcrafted goods from over 20 vendors. Chat with farmers about sustainable agriculture, sample seasonal treats, and support small businesses in your community."
  },
  {
    name: "Charity Run",
    date: new Date("2023-09-01T07:00:00Z"),
    location: "City Stadium",
    description: "A run to raise funds for local charities.",
    numberOfAttendees: 120,
    imageURI: "/images/Charity-Run.png",
    // Source: Chat GPT
    type: "Meetup",
    extended: "Participate in a scenic 5K run around the stadium grounds to benefit local non-profits. All fitness levels are welcome; participants receive a commemorative shirt, water stations line the course, and awards are given to top finishers in each age group."
  },
  {
    name: "Book Club Meetup",
    date: new Date("2023-07-12T19:00:00Z"),
    location: "Community Library",
    description: "Discussion of this month’s book selection.",
    numberOfAttendees: 30,
    imageURI: "/images/Book-Club-Meetup.png",
    // Source: Chat GPT
    type: "Meetup",
    extended: "Join fellow readers for an engaging discussion of our monthly book pick in the cozy library lounge. Enjoy complimentary coffee and pastries, share insights on themes and characters, and help choose next month’s selection."
  },
  {
    name: "Tech Talk",
    date: new Date("2023-07-20T17:00:00Z"),
    location: "Innovation Hub",
    description: "Presentation on the latest trends in technology.",
    numberOfAttendees: 80,
    imageURI: "/images/Tech-Talk.png",
    // Source: Chat GPT
    type: "Class",
    extended: "Dive into emerging tech trends like AI, blockchain, and cybersecurity with our expert speaker. The session includes a keynote presentation, interactive Q&A, and networking time with local startups and industry professionals."
  },
  {
    name: "Cooking Workshop",
    date: new Date("2023-08-05T14:00:00Z"),
    location: "Culinary Institute",
    description: "Learn to cook healthy and delicious meals.",
    numberOfAttendees: 25,
    imageURI: "/images/Cooking-Workshop.png",
    // Source: Chat GPT
    type: "Workshop",
    extended: "Master new culinary skills in this hands-on class led by a professional chef. You’ll learn knife techniques, ingredient selection, and plating tips before enjoying the healthy, flavorful dishes you’ve prepared."
  },
  {
    name: "Yoga Class",
    date: new Date("2023-07-15T06:30:00Z"),
    location: "City Park",
    description: "Morning yoga session to promote wellness.",
    numberOfAttendees: 35,
    imageURI: "/images/Yoga-Class.png",
    // Source: Chat GPT
    type: "Class",
    extended: "Start your day with a rejuvenating sunrise yoga session suitable for all levels in a peaceful park setting. Focus on breathwork, gentle stretches, and mindfulness as you connect with nature and fellow practitioners."
  },
  {
    name: "Outdoor Movie Night",
    date: new Date("2023-08-10T20:00:00Z"),
    location: "Community Center",
    description: "Screening of classic movies under the stars.",
    numberOfAttendees: 90,
    imageURI: "/images/Outdoor-Movie-Night.png",
    // Source: Chat GPT
    type: "Meetup",
    extended: "Gather under the stars for a family-friendly screening of a timeless classic. Bring blankets or lawn chairs, grab popcorn and snacks from local vendors, and enjoy a special pre-show trivia session."
  },
  {
    name: "History Lecture",
    date: new Date("2023-07-25T18:30:00Z"),
    location: "Museum Auditorium",
    description: "A talk on local historical events and figures.",
    numberOfAttendees: 60,
    imageURI: "/images/History-Lecture.png",
    // Source: Chat GPT
    type: "Class",
    extended: "Explore fascinating local history with rare photographs and artifacts presented by our guest historian. The lecture concludes with a guided Q&A and optional tour of the museum’s archives."
  },
  {
    name: "Gardening Workshop",
    date: new Date("2023-08-12T10:00:00Z"),
    location: "Botanical Garden",
    description: "Tips and tricks for urban gardening.",
    numberOfAttendees: 45,
    imageURI: "/images/Gardening-Workshop.png",
    // Source: Chat GPT
    type: "Workshop",
    extended: "Learn how to create thriving urban gardens in small spaces, covering soil health, container planting, and vertical gardening techniques. This interactive workshop includes hands-on planting and expert advice on pest management."
  },
  {
    name: "Coding Bootcamp",
    date: new Date("2023-09-10T09:00:00Z"),
    location: "Tech Campus",
    description: "An intensive workshop for beginners in coding.",
    numberOfAttendees: 50,
    imageURI: "/images/Coding-Bootcamp.png",
    // Source: Chat GPT
    type: "Workshop",
    extended: "Jumpstart your coding journey with a full-day introduction to HTML, CSS, and JavaScript fundamentals. Complete a mini-project with mentorship from experienced instructors and receive resources for continued learning."
  },
  {
    name: "Science Fair",
    date: new Date("2023-08-20T09:00:00Z"),
    location: "High School Gymnasium",
    description: "Exhibits and demonstrations from local schools.",
    numberOfAttendees: 100,
    imageURI: "/images/Science-Fair.png",
    // Source: Chat GPT
    type: "Festival",
    extended: "Discover innovative student projects in robotics, chemistry, and environmental science at our annual fair. Interact with young scientists, cast your vote for best exhibit, and catch live demos throughout the day."
  },
  {
    name: "Dance Competition",
    date: new Date("2023-09-05T15:00:00Z"),
    location: "Community Dance Studio",
    description: "Showcase of local dance talent.",
    numberOfAttendees: 70,
    imageURI: "/images/Dance-Competition.png",
    // Source: Chat GPT
    type: "Performance",
    extended: "Watch talented dance crews compete in styles ranging from hip-hop and jazz to contemporary and cultural performances. Live DJs, audience voting, and awards add to the excitement of the event."
  },
  {
    name: "Photography Exhibition",
    date: new Date("2023-07-30T17:00:00Z"),
    location: "City Gallery",
    description: "Display of photographs capturing local life.",
    numberOfAttendees: 55,
    imageURI: "/images/Photography-Exhibition.png",
    // Source: Chat GPT
    type: "Festival",
    extended: "Admire a curated selection of photographs that highlight the beauty and diversity of our community. Meet the photographers at the opening reception and learn about their creative processes."
  },
  {
    name: "Community Cleanup",
    date: new Date("2023-08-25T08:00:00Z"),
    location: "Neighborhood Park",
    description: "Volunteers work together to clean up local parks.",
    numberOfAttendees: 40,
    imageURI: "/images/Community-Cleanup.png",
    // Source: Chat GPT
    type: "Meetup",
    extended: "Join neighbors in cleaning and beautifying our local parks and green spaces. All supplies are provided, and volunteers receive water, snacks, and a commemorative badge for their service."
  },
  {
    name: "Poetry Slam",
    date: new Date("2023-08-18T19:00:00Z"),
    location: "Cafe Luna",
    description: "Open mic event for local poets.",
    numberOfAttendees: 35,
    imageURI: "/images/Poetry-Slam.png",
    // Source: Chat GPT
    type: "Performance",
    extended: "Experience the power of spoken word at our open mic night featuring local poets. Enjoy specialty drinks, immerse yourself in creative expression, and vote for your favorite performances."
  },
  {
    name: "Craft Fair",
    date: new Date("2023-09-15T11:00:00Z"),
    location: "Community Center",
    description: "Local artisans sell handmade crafts.",
    numberOfAttendees: 65,
    imageURI: "/images/Craft-Fair.png",
    // Source: Chat GPT
    type: "Workshop",
    extended: "Shop unique handmade jewelry, ceramics, textiles, and woodwork from talented artisans. Live craft demonstrations, DIY stations for kids, and folk music performances create a festive atmosphere."
  },
  {
    name: "Local Theater Play",
    date: new Date("2023-09-20T19:30:00Z"),
    location: "Downtown Theater",
    description: "A play produced by a local theater group.",
    numberOfAttendees: 80,
    imageURI: "/images/Local-Theater-Play.png",
    // Source: Chat GPT
    type: "Performance",
    extended: "Be transported by a passionate performance of an original play exploring community themes. Professional set design, engaging dialogue, and a post-show discussion with the cast make for an unforgettable evening."
  }
]);
db.events.createIndex(
  { name: "text", description: "text" },
  { name: "TextIndex_Name_Description" }
);
db.events.find().pretty();
