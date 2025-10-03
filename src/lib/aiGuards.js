// confusion count per user 
const confusionTracker = {};

export function isCareerRelated(msg) {
  const keywords = ["career", "job", "skill", "work", "future", "role", "strength", "recommendation", "skillgap","hai", "halo", "hello", "hi"];
  return keywords.some((kw) => msg.toLowerCase().includes(kw));
}

export function trackConfusion(userId, msg) {
  if (!confusionTracker[userId]) confusionTracker[userId] = 0;

  // deteksi kata kunci bingung, stuck, deadlock, mentok, buntu
  if (["bingung", "stuck", "deadlock", "mentok", "buntu"].some(kw => msg.toLowerCase().includes(kw))) {
    confusionTracker[userId]++;
  }

  return confusionTracker[userId];
}

export function resetConfusion(userId) {
  confusionTracker[userId] = 0;
}

export async function mentorRecommendation(userId) {
  try {
    // ambil mentor dengan filter userId
    const res = await fetch(
      `https://68dbdac9445fdb39dc26d84f.mockapi.io/api/v1/mentors?userId=${userId}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch mentors");
    }

    const mentors = await res.json();

    if (!mentors || mentors.length === 0) {
      return "Belum ada mentor yang terhubung dengan akunmu. Silakan hubungi admin Arunika.";
    }

    // format daftar mentor
    const list = mentors
      .map(
        (m, i) => `${i + 1}. ${m.name} (${m.role})  
   - Expertise: ${m.expertise.join(", ")}  
   - Contact: ${m.contact.email} | ${m.contact.linkedin}`
      )
      .join("\n\n");

    return `Sepertinya ini sulit dijelaskan lewat chat. Akan lebih baik jika kamu konsultasi langsung dengan mentor.\n\nRekomendasi mentor untukmu:\n\n${list}`;
  } catch (error) {
    console.error("Fetch mentor error:", error);
    return "Gagal memuat daftar mentor. Silakan coba lagi nanti.";
  }
}
