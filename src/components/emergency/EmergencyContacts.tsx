"use client";

import {
  ArrowRight,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export default function EmergencyContacts() {
  const { t } = useLanguage();

  const contacts = [
    {
      title: t.emergency.contacts.eoc.title,
      description:
        t.emergency.contacts.eoc.description,
      action: t.emergency.contacts.eoc.action,
    },
    {
      title: t.emergency.contacts.team.title,
      description:
        t.emergency.contacts.team.description,
      action: t.emergency.contacts.team.action,
    },
  ];

  return (
    <section className="emergency-contacts-card">
      <div className="emergency-contacts-header">
        <div className="emergency-contacts-icon">
          <ShieldCheck size={21} />
        </div>

        <div>
          <span className="section-eyebrow">
            {t.emergency.contacts.eyebrow}
          </span>

          <h2>{t.emergency.contacts.title}</h2>

          <p>{t.emergency.contacts.description}</p>
        </div>
      </div>

      <div className="emergency-contact-list">
        {contacts.map((contact) => (
          <div
            className="emergency-contact-item"
            key={contact.title}
          >
            <div className="emergency-contact-info">
              <div className="emergency-contact-phone">
                <Phone size={15} />
              </div>

              <div>
                <strong>{contact.title}</strong>
                <p>{contact.description}</p>
              </div>
            </div>

            <button type="button">
              {contact.action}
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}