"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface TeamMember {
  name: { first: string; last: string };
  picture: { large: string };
  email: string;
  location: { city: string; country: string };
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get("https://randomuser.me/api/?results=6");
        setTeam(res.data.results);
      } catch (error) {
        console.error("Error fetching team", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) return <div className="text-center py-20">Loading Team...</div>;

  return (
    <div className="min-h-screen bg-beige py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-coffee-900 mb-12">Meet Our Baristas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 text-center hover:-translate-y-2 transition duration-300">
              <img 
                src={member.picture.large} 
                alt={member.name.first} 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-coffee-200"
              />
              <h3 className="text-xl font-bold text-black capitalize">
                {member.name.first} {member.name.last}
              </h3>
              <p className="text-black font-medium">Barista</p>
              <p className="text-gray-500 text-sm mt-2">{member.location.city}, {member.location.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}