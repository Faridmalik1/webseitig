"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />
      <div className="max-w-[1568px] mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[#C8E646] text-sm mb-10 hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} /> Zurück zur Startseite
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl mb-2"
        >
          Datenschutzerklärung
        </motion.h1>

        <p className="text-white/70 leading-relaxed mb-4">
          Gültig ab 1. Januar 2025 · gemäss Schweizer DSG
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-8 text-white/70 leading-relaxed"
        >
          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">1.</span> Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten im Sinne des Schweizer Datenschutzgesetzes (DSG) ist:
            </p>
            <div className="bg-gray-800 p-4 rounded mt-4">
              <p>
                Web<span className="text-[#C8F135]">.</span>Seitig <br />
                Schärenmoosstrasse 77 <br />
                8052 Zürich <br />
                
              </p>
              <p>E-Mail: <a href="mailto:hello@webseitig.ch" className="text-[#C8E646] hover:underline">hello@webseitig.ch</a></p>
                <p>Web: <a href="https://webseitig.ch" className="text-[#C8E646] hover:underline">webseitig.ch</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">2.</span> Grundsätze der Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten nur, wenn dies gesetzlich erlaubt ist oder Sie Ihre Einwilligung erteilt haben. Wir halten uns an folgende Grundsätze:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>Rechtmässigkeit: Datenverarbeitung nur auf gesetzlicher Grundlage</li>
              <li>Zweckbindung: Nutzung nur für den festgelegten Zweck</li>
              <li>Datensparsamkeit: Erhebung nur der notwendigen Daten</li>
              <li>Richtigkeit: Daten werden aktuell gehalten</li>
              <li>Speicherbegrenzung: Löschung nach Wegfall des Zwecks</li>
              <li>Integrität und Vertraulichkeit: Angemessene technische Schutzmassnahmen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">3.</span> Erhobene Daten und Zwecke</h2>
            <h4 className="text-white text-base mb-2">Beim Besuch unserer Website</h4>
            <p>
              Beim Aufrufen unserer Website werden automatisch folgende technische Daten erfasst:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>IP-Adresse (anonymisiert)</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Aufgerufene Seiten und Verweildauer</li>
              <li>Verwendeter Browser und Betriebssystem</li>
              <li>Verweisende Website (Referrer)</li>
            </ul>
            <p className="mt-2">
              Diese Daten werden ausschliesslich zur Sicherstellung des technischen Betriebs und zur anonymisierten Statistik verwendet. Eine Zusammenführung mit anderen Daten findet nicht statt.
            </p>
            <div>
              <h4 className="text-white text-base mt-4 mb-2">Beim Kontaktformular / Erstgespräch-Buchung</h4>
              <p>
                Wenn Sie unser Kontaktformular ausfüllen oder ein Erstgespräch buchen, erheben wir:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name und Vorname</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer (optional)</li>
                <li>Name Ihres Unternehmens</li>
                <li>Inhalt Ihrer Anfrage</li>
              </ul>
              <p>
                Diese Daten werden verwendet, um Ihre Anfrage zu bearbeiten und mit Ihnen in Kontakt zu treten. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre Einwilligung.
              </p>
              <h4 className="text-white text-base mt-4 mb-2">Im Rahmen eines Vertragsverhältnisses</h4>
              <p>
                Zur Vertragserfüllung verarbeiten wir zusätzlich: Rechnungsadresse, Zahlungsinformationen sowie alle projektbezogenen Kommunikationsdaten. Rechtsgrundlage ist die Vertragserfüllung gemäss Art. 6 DSG.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">4.</span> Cookies und Tracking</h2>
            <h4 className="text-white text-base mt-4 mb-2">Technisch notwendige Cookies</h4>
            <p>
              Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden. Sie speichern keine personenbezogenen Daten und werden nach dem Schliessen des Browsers gelöscht.
            </p>
            <h4 className="text-white text-base mt-4 mb-2">Analyse-Cookies (Google Analytics)</h4>
            <p>
              Mit Ihrer Einwilligung verwenden wir Google Analytics, um das Nutzerverhalten auf unserer Website zu verstehen und unser Angebot zu verbessern. Die IP-Adresse wird vor der Speicherung anonymisiert. Sie können der Datenerfassung durch Google Analytics jederzeit widersprechen.
            </p>
            <div className="bg-gray-800 p-4 rounded mt-4">
              <p>
                Hinweis: Sie können Cookies in den Einstellungen Ihres Browsers jederzeit deaktivieren
                oder löschen. Bitte beachten Sie, dass die Deaktivierung bestimmter Cookies die
                Funktionalität unserer Website einschränken kann.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">5.</span> Drittanbieter und Dienste</h2>
            <h4 className="text-white text-base mt-4 mb-2">Google Maps</h4>
            <p>
              Auf Kunden-Websites binden wir Google Maps ein. Dabei werden Daten an Google LLC (USA) übertragen. Grundlage ist ein Standardvertragsklausel-Abkommen gemäss DSG/DSGVO. Datenschutzerklärung: policies.google.com/privacy
            </p>
            <h4 className="text-white text-base mt-4 mb-2">Google Analytics</h4>
            <p>
              Zur Website-Analyse nutzen wir Google Analytics 4 mit IP-Anonymisierung. Eine Weitergabe der Daten an Google LLC (USA) erfolgt nur mit Ihrer Einwilligung. Sie können der Analyse unter tools.google.com/dlpage/gaoptout widersprechen.
            </p>
            <h4 className="text-white text-base mt-4 mb-2">Hosting</h4>
            <p>
              Unsere Website und Kunden-Websites werden bei einem europäischen Hosting-Anbieter gehostet. Die Daten werden ausschliesslich auf Servern in der Schweiz oder der EU verarbeitet.
            </p>
            <h4 className="text-white text-base mt-4 mb-2">E-Mail-Kommunikation</h4>
            <p>
              Für unsere E-Mail-Kommunikation verwenden wir sichere, verschlüsselte Verbindungen (TLS). E-Mails werden auf Servern innerhalb der Schweiz gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">6.</span> Datenspeicherung und Löschung</h2>
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>Kontaktanfragen: 2 Jahre nach Abschluss der Kommunikation</li>
              <li>Vertragsdaten: 10 Jahre nach Vertragsende (gesetzliche Aufbewahrungspflicht)</li>
              <li>Rechnungen: 10 Jahre (OR Art. 958f)</li>
              <li>Website-Logs: 30 Tage, danach automatische Löschung</li>
              <li>Bewerbungsunterlagen: 6 Monate nach Abschluss des Verfahrens</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">7.</span> Ihre Rechte</h2>
            <p>
              Gemäss dem Schweizer Datenschutzgesetz (DSG) haben Sie folgende Rechte:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>Auskunftsrecht: Sie können jederzeit Auskunft über die zu Ihrer Person gespeicherten Daten verlangen.</li>
              <li>Berichtigungsrecht: Sie können die Korrektur unrichtiger Daten verlangen.</li>
              <li>Löschungsrecht: Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzliche Aufbewahrungspflicht besteht.</li>
              <li>Recht auf Datenportabilität: Sie können Ihre Daten in einem maschinenlesbaren Format erhalten.</li>
              <li>Widerspruchsrecht: Sie können der Verarbeitung Ihrer Daten zu Marketingzwecken jederzeit widersprechen.</li>
              <li>Beschwerderecht: Sie haben das Recht, sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.</li>
            </ul>

            <div className="bg-gray-800 p-4 rounded mt-4">
              <p>
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: hello@webseitig.ch <br />
                Wir beantworten Ihre Anfrage innerhalb von 30 Tagen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">8.</span> Datensicherheit</h2>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Daten gegen Verlust, Zerstörung, Verfälschung und unberechtigten Zugriff zu schützen. Zu diesen Massnahmen gehören:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>SSL/TLS-Verschlüsselung aller Datenübertragungen</li>
              <li>Regelmässige Sicherheitsupdates und Patches</li>
              <li>Zugriffsbeschränkungen auf personenbezogene Daten</li>
              <li>Regelmässige Datensicherungen</li>
              <li>Schulung aller Mitarbeitenden in Datenschutzfragen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">9.</span> Änderungen dieser Datenschutzerklärung</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, um sie an geänderte Rechtslage oder bei Änderungen unserer Dienstleistungen zu aktualisieren. Die jeweils aktuelle Version ist auf unserer Website abrufbar. Bei wesentlichen Änderungen informieren wir Sie per E-Mail.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8E646]">10.</span> Kontakt Datenschutz</h2>
            <p>
              Bei Fragen zum Datenschutz oder zur Geltendmachung Ihrer Rechte wenden Sie sich bitte an:
            </p>
            <div className="bg-gray-800 p-4 rounded my-4">
              <p>
                Web<span className="text-[#C8F135]">.</span>Seitig <br />
                Schärenmoosstrasse 77 <br />
                8052 Zürich <br />
              </p>
              <p>E-Mail: <a href="mailto:hello@webseitig.ch" className="text-[#C8E646] hover:underline">hello@webseitig.ch</a></p>
            </div>
            <p>
              Beschwerden können Sie auch an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) richten: www.edoeb.admin.ch
            </p>
          </section>

        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
