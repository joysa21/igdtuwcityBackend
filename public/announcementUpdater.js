// Array of URLs for each society's announcement page
const announcementPages = ["./announcement_techneeds.html", "./announcement_aws.html", "./announcement_tarannum.html", "./announcements_avira.html", "./announcement_hypnotics.html", "./announcement_rahnuma.html", "./announcement_innerve.html", "./announcement_igdtuwResource.html", "./bhav_announcement.html", "./announcement_nirvana.html", "./announcement_ai.html", "./announcement_ieee.html", "./announcements_enactus.html", "./announcement_avasa.html", "./announcement_synergy.html", "./announcement_protege.html", "./announcements_rtr.html", "./announcements_soch.html", "./announcement_rooh.html", "./announcementRobolution.html", "./announcement_msc.html", "./announcement_optica.html", "./announcements_leanin.html", "./announcement_gdsc.html", "./announcement_technoliterati.html", "./minerva_announcement.html", "./announcement_hackclub.html", "./announcement_prekshya.html", "./announcement_assert.html", "./announcement_instinct.html", "./announcement_finivesta.html", "./announcement_greensphere.html", "./announcement_accordo.html", "./announcements_ignite.html", "./announcementTaarangana.html", "./announcement_zena.html", "./announcement_coding.html"];

// Function to load announcements from each page
async function loadAnnouncements() {
    const updatesContainer = document.getElementById('updates-container');
    const timestamp = new Date().getTime();  // Create a unique timestamp to prevent caching

    for (const page of announcementPages) {
        try {
            const response = await fetch(`${page}?t=${timestamp}`);  // Append the timestamp to the URL

            if (!response.ok) {
                throw new Error(`Failed to fetch ${page}: ${response.statusText}`);
            }

            const text = await response.text();

            // Parse the response HTML and extract the <p> content by ID
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const announcementTag = doc.getElementById('announcement');

            // Append the announcement to the updates container if it exists and is not empty
            if (announcementTag && announcementTag.textContent.trim() !== 'No announcements yet.') {
                const announcementContent = announcementTag.textContent.trim();
                const firstSixWords = announcementContent.split(' ').slice(0, 6).join(' ') + '...';

                const announcementItem = document.createElement('li');
                announcementItem.className = 'update-item';

                const leftDiv = document.createElement('div');
                leftDiv.className = 'left';
                leftDiv.textContent = getSocietyName(page);

                const rightDiv = document.createElement('div');
                rightDiv.className = 'right';

                const contentSpan = document.createElement('span');
                contentSpan.className = 'content';
                contentSpan.textContent = firstSixWords;

                const link = document.createElement('a');
                link.href = page;
                link.textContent = 'Go to channel';

                rightDiv.appendChild(contentSpan);
                rightDiv.appendChild(link);
                announcementItem.appendChild(leftDiv);
                announcementItem.appendChild(rightDiv);
                updatesContainer.appendChild(announcementItem);
            }
        } catch (error) {
            console.error(`Failed to load announcements from ${page}:`, error);
        }
    }

    // Handle case when no announcements are found
    if (updatesContainer.children.length === 0) {
        const noAnnouncementsMessage = document.createElement('p');
        noAnnouncementsMessage.textContent = 'No announcements available at this time.';
        updatesContainer.appendChild(noAnnouncementsMessage);
    }
}

// Function to extract the society name from the page URL
function getSocietyName(page) {
    const nameMapping = {
        "./announcement_protege.html": "Protégé",
        "./announcement_techneeds.html": "TechNeeds",
        "./announcement_rahnuma.html": "Rahnuma",
        "./announcement_zena.html": "Zena",
        "./announcements_avira.html": "Avira",
        "./announcement_hypnotics.html": "Hypnotics",
        "./announcement_gdsc.html": "GDSC",
        "./announcement_synergy.html": "Synergy",
        "./announcement_prekshya.html": "Prekshya",
        "./announcement_tarannum.html": "Tarannum",
        "./announcement_ieee.html": "IEEE",
        "./announcement_innerve.html": "Innerve",
        "./announcement_msc.html": "MSC",
        "./announcement_aws.html": "AWS",
        "./announcement_assert.html": "AssetMerkle",
        "./announcement_nirvana.html": "Nirvana",
        "./announcement_ai.html": "AI Club",

        "./announcements_enactus.html": "Enactus",
        "./announcement_avasa.html": "Avasa",


       
        "./announcements_rtr.html": "Rotaract",
        "./announcements_soch.html": "Soch",
        "./announcement_rooh.html": "Rooh",
        "./announcement_coding.html": "CodeBenders",
        "./announcementRobolution.html": "Robolution",

        "./announcement_optica.html": "Optica",
        "./announcements_leanin.html": "Lean In",

        "./announcement_igdtuwResource.html": "IGDTUW Resource",
        "./bhav_announcement.html": "Bhav",
        "./announcement_technoliterati.html": "Technoliterati",
        "./minerva_announcement.html": "Minerva",
        "./announcement_hackclub.html": "HackClub",

        "./announcement_instinct.html": "Instinct",
        "./announcement_finivesta.html": "Finivesta",
        "./announcement_greensphere.html": "Greensphere",
        "./announcement_accordo.html": "Accordo",
        "./announcements_ignite.html": "Ignite",
        "./announcementTaarangana.html": "Taarangana"
    };

    return nameMapping[page] || "Unknown Society";
}

// Load announcements when the page is fully loaded
window.addEventListener('DOMContentLoaded', loadAnnouncements);
