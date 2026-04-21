export interface PortfolioData {
    personal_info?: Array<{ meta_data: { name: string; email: string; phone: string } }>;
    introduction?: Array<{ meta_data: { introduction: string } }>;
    total_experience?: Array<{ meta_data: { total_experience: string } }>;
    experience?: Array<{ meta_data: { role: string; company: string; start_date: string; end_date: string; description: string } }>;
    education?: Array<{ meta_data: { degree: string; institution: string; start_year: string; end_year: string } }>;
    skills?: Array<{ meta_data: { skills: string } }>;
    resume_owner_pic?: Array<{ meta_data: { resume_owner_pic: string } }>;
    social_links?: Array<{ meta_data: { github: string; linkedin: string } }>;
    projects?: Array<{ meta_data: { title: string; company: string; tech_stack: string[]; description: string; project_pic: string; impact?: string } }>;
    resume_link?: Array<{ meta_data: string }>;
}
