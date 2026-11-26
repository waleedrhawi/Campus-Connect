const day = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const mockEvents = [
  {
    id: "1",
    title: "Welcome Fair & Club Showcase",
    category: "Social",
    date: day(3),
    time: "11:00",
    venue: "Main Quad",
    description:
      "Meet every student club on campus, collect freebies and find the community that fits you. Live music and food stalls all afternoon.",
    schedule: [
      { time: "11:00", item: "Opening and welcome speech" },
      { time: "12:00", item: "Club booths open" },
      { time: "14:30", item: "Live student bands" },
    ],
    capacity: 300,
    registered: 212,
  },
  {
    id: "2",
    title: "Career Day: Meet the Employers",
    category: "Career",
    date: day(6),
    time: "09:30",
    venue: "Engineering Hall, Room B12",
    description:
      "Over 30 companies will be recruiting for internships and graduate roles. Bring printed copies of your CV.",
    schedule: [
      { time: "09:30", item: "Registration and check-in" },
      { time: "10:00", item: "Employer panel" },
      { time: "11:30", item: "One-to-one CV reviews" },
      { time: "14:00", item: "Networking lunch" },
    ],
    capacity: 150,
    registered: 141,
  },
  {
    id: "3",
    title: "Intro to React Workshop",
    category: "Tech",
    date: day(9),
    time: "16:00",
    venue: "Computer Lab 3",
    description:
      "A hands-on beginner workshop: build and deploy your first React app in two hours. Laptops provided.",
    schedule: [
      { time: "16:00", item: "Components and props" },
      { time: "16:45", item: "State and events" },
      { time: "17:30", item: "Build a mini project" },
    ],
    capacity: 40,
    registered: 28,
  },
  {
    id: "4",
    title: "Inter-Faculty Football Cup",
    category: "Sports",
    date: day(12),
    time: "15:00",
    venue: "University Stadium",
    description:
      "Cheer on your faculty in the semi-finals of the annual football cup. Free entry for all students.",
    schedule: [
      { time: "15:00", item: "Semi-final 1" },
      { time: "17:00", item: "Semi-final 2" },
    ],
    capacity: 500,
    registered: 190,
  },
  {
    id: "5",
    title: "Open Mic & Poetry Night",
    category: "Arts",
    date: day(15),
    time: "19:00",
    venue: "Student Centre Café",
    description:
      "Share a poem, a song or a story, or just come to listen. Sign-up for performers opens at the door.",
    schedule: [
      { time: "19:00", item: "Doors open" },
      { time: "19:30", item: "Open mic sessions" },
      { time: "21:00", item: "Featured performer" },
    ],
    capacity: 80,
    registered: 80,
  },
  {
    id: "6",
    title: "Research Skills: Writing Your First Paper",
    category: "Academic",
    date: day(20),
    time: "13:00",
    venue: "Library Seminar Room",
    description:
      "Faculty mentors share how to structure, cite and submit an academic paper. Includes a Q&A session.",
    schedule: [
      { time: "13:00", item: "Structuring a paper" },
      { time: "14:00", item: "Citations and references" },
      { time: "14:45", item: "Q&A with mentors" },
    ],
    capacity: 60,
    registered: 22,
  },
];
