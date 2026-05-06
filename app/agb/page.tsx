"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function Agb() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />
      <div className="max-w-[1568px] mx-auto px-6 md:px-8 py-16 pt-28">
        <Link href="/" className="inline-flex items-center gap-2 text-[#C8F135] text-[16px] sm:text-[18px] mb-10 hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} /> Zurück zur Startseite
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[20px] sm:text-[24px] lg:text-[32px] mb-8"
        >
          Allgemeine Geschäftsbedingungen (AGB).
        </motion.h1>
        <div className="bg-gray-800 p-4 rounded mb-4">
          <p>
            Gültig ab 1. Januar 2025 · Stand: April 2025 <br />
             webseitig.ch
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-8 text-white/70 leading-relaxed"
        >
          <section>
            <h2 className="text-white text-lg mb-3"> <span className="text-[#C8F135]">1.</span> Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Web.seitig (nachfolgend «web.seitig» oder «Anbieter») und ihren Kunden (nachfolgend «Kunde») im Rahmen der Erstellung, Gestaltung und Betreuung von Websites sowie damit verbundener Dienstleistungen.
              Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Kunden werden nicht Vertragsbestandteil, auch wenn web.seitig ihnen nicht ausdrücklich widerspricht, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">2.</span> Leistungsumfang</h2>
            <p>
              web.seitig erbringt Dienstleistungen im Bereich der Erstellung professioneller Websites für Schweizer KMU. Der genaue Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.
            </p>

            <h4 className="text-white text-base mt-4 mb-2">Standardleistungen umfassen:</h4>

            <ul className="list-disc pl-6 space-y-1">
              <li>Konzeption und Gestaltung der Website nach Kundenvorgaben</li>
              <li>Technische Umsetzung und Entwicklung</li>
              <li>Einrichtung von Hosting und Domain (gemäss gewähltem Paket)</li>
              <li>Grundlegende SEO-Optimierung</li>
              <li>Einrichtung von Google Maps und Bewertungen (Business Pro)</li>
              <li>Technischer Support während der Vertragslaufzeit</li>
            </ul>

            <p className="mt-4">
              Leistungen, die über den vereinbarten Umfang hinausgehen, werden nach Aufwand zum gültigen Stundensatz in Rechnung gestellt. Solche Mehrleistungen werden vorab schriftlich kommuniziert und bedürfen der Zustimmung des Kunden.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">3.</span> Vertragsabschluss</h2>
            <p>
              Ein Vertrag kommt zustande durch die schriftliche Auftragsbestätigung seitens web.seitig nach Eingang der Bestellung des Kunden. Angebote von web.seitig sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
              Das kostenlose Erstgespräch (15 Minuten) stellt kein bindendes Angebot dar. Nach dem Gespräch erhalten Interessenten ein individuelles, schriftliches Angebot. Erst nach dessen Annahme durch den Kunden kommt ein Vertragsverhältnis zustande.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3">
              <span className="text-[#C8F135]">4.</span> Preise und Zahlungsbedingungen
            </h2>

            <p className="mb-4">
              Alle Preise verstehen sich in Schweizer Franken (CHF) und, sofern nicht anders angegeben, zuzüglich der gesetzlichen Mehrwertsteuer.
            </p>

            <p className="mb-3">Aktuelle Pakete:</p>

            <div className="bg-gray-800 p-4 rounded mb-4">
              <p className="mb-2">
                Starter – CHF 179/Monat
              </p>
              <p>
                Bis zu 5 Seiten, Mobile-optimiert, Kontaktformular, Hosting & Domain inklusive, <br />
                SEO-Grundlagen, Lieferung in 7 Tagen.
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded">
              <p className="mb-2">
                Business Pro – CHF 249/Monat
              </p>
              <p>
                Bis zu 10 Seiten, Blog-/News-Bereich, Google Maps & Bewertungen, <br />
                SEO-Optimierung, bis zu 1'800 Änderungen pro Monat, <br />
                24h Support-Zeit, Google Analytics Setup.

              </p>
            </div>

            <div className="mt-4">
              <p className=" mb-3">Zahlungsmodalitäten:</p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  Die monatliche Gebühr wird jeweils zu Beginn des Abrechnungsmonats in Rechnung gestellt.
                </li>
                <li>
                  Rechnungen sind innerhalb von 10 Tagen nach Rechnungsdatum zu begleichen.
                </li>
                <li>
                  Bei Zahlungsverzug ist web.seitig berechtigt, die Dienste bis zum Ausgleich der offenen Beträge zu unterbrechen.
                </li>
                <li>
                  Preisanpassungen werden dem Kunden mindestens 30 Tage im Voraus schriftlich mitgeteilt.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-4">
              <span className="text-[#C8F135]">5.</span> Mitwirkungspflichten des Kunden
            </h2>

            <div className="space-y-1">
              <p>
                Der Kunde ist verpflichtet, web.seitig alle für die Durchführung des Auftrags erforderlichen Informationen, Unterlagen, Texte, Bilder und sonstigen Inhalte rechtzeitig und vollständig zur Verfügung zu stellen.
              </p>
              <p>
                Der Kunde stellt sicher, dass er über alle erforderlichen Rechte an den bereitgestellten Materialien verfügt. web.seitig übernimmt keine Haftung für Rechtsverletzungen durch vom Kunden gelieferte Inhalte.
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded mt-2">
              <p>
                Hinweis: Die Lieferzeit von 7 Tagen gilt unter der Voraussetzung, dass der Kunde alle
                benötigten Inhalte und Informationen vollständig und fristgerecht liefert. Verzögerungen
                durch unvollständige Informationen gehen nicht zu Lasten von web.seitig.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">6.</span> Lieferung und Abnahme</h2>
            <div className="space-y-2">
              <p>
                Nach Fertigstellung der Website erhält der Kunde einen Freigabe-Link zur Überprüfung. Der Kunde hat 5 Arbeitstage Zeit, Mängel oder Änderungswünsche zu melden. Werden innerhalb dieser Frist keine Mängel gemeldet, gilt die Website als abgenommen.
              </p>
              <p>
                Änderungswünsche, die über das vereinbarte Leistungspaket hinausgehen, werden separat angeboten und in Rechnung gestellt.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">7.</span> Nutzungsrechte und Urheberrecht</h2>
            <div className="space-y-2">
              <p>
                Mit vollständiger Bezahlung erhält der Kunde ein einfaches, nicht übertragbares Nutzungsrecht an der erstellten Website für den vertraglich vorgesehenen Zweck.
              </p>
              <p>
                web.seitig behält das Urheberrecht an allen selbst erstellten Designs, Templates und Code-Bibliotheken. Der Quellcode kann nach vollständiger Zahlung aller offenen Beträge und auf ausdrücklichen Wunsch des Kunden herausgegeben werden.
              </p>
              <p>
                web.seitig ist berechtigt, die erstellten Websites in ihrem Portfolio und zu Referenzzwecken zu nennen und darzustellen, sofern der Kunde nicht ausdrücklich widerspricht.

              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">8.</span> Gewährleistung und Haftung</h2>
            <div className="space-y-2">
              <p>
                web.seitig gewährleistet, dass die erstellten Websites zum Zeitpunkt der Abnahme den vereinbarten Spezifikationen entsprechen. Technische Mängel werden innerhalb angemessener Frist behoben.
              </p>
              <p>
                Die Haftung von web.seitig ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Eine Haftung für mittelbare Schäden, entgangenen Gewinn oder Datenverlust ist ausgeschlossen, soweit gesetzlich zulässig.
              </p>
              <p>
                web.seitig haftet nicht für Ausfälle oder Einschränkungen, die durch Drittanbieter (z.B. Hosting-Provider, Domain-Registrar, Drittdienste) verursacht werden.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">9.</span> Vertragsdauer und Kündigung</h2>
            <div className="space-y-2">
              <p>
                Verträge laufen zunächst für eine Mindestlaufzeit von 12 Monaten. Danach verlängern sie sich automatisch um jeweils 12 weitere Monate, sofern sie nicht mit einer Frist von 3 Monaten zum Ende der Laufzeit schriftlich gekündigt werden.
              </p>
              <p>
                Das Recht zur ausserordentlichen Kündigung aus wichtigem Grund bleibt beiderseits vorbehalten. Ein wichtiger Grund liegt insbesondere vor, wenn der Kunde mit mehr als zwei Monatszahlungen in Verzug ist.
              </p>
              <p>
                Bei Kündigung werden alle von web.seitig gehosteten Website-Daten nach einer Übergabefrist von 30 Tagen gelöscht, sofern nicht anderweitig vereinbart.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">10.</span> Datenschutz</h2>
            <div className="space-y-2">
              <p>
                Der Umgang mit personenbezogenen Daten erfolgt gemäss unserer Datenschutzerklärung und den geltenden datenschutzrechtlichen Bestimmungen, insbesondere dem Schweizer Datenschutzgesetz (DSG).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white text-lg mb-3"><span className="text-[#C8F135]">11.</span> Schlussbestimmungen</h2>
            <div className="space-y-2">
              <p>
                Es gilt ausschliesslich Schweizer Recht unter Ausschluss des Kollisionsrechts. Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag ist Zürich, Schweiz.
              </p>
              <p>
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
              <p>
                web.seitig behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden dem Kunden mindestens 30 Tage vor Inkrafttreten schriftlich mitgeteilt.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded mt-4">
              <p>
                Web<span className="text-[#C8F135]">.</span>Seitig <br />
                Schärenmoosstrasse 77 <br />
                8052 Zürich <br />
              </p>
              <p>E-Mail: <a href="mailto:hello@webseitig.ch" className="text-[#C8F135] hover:underline">hello@webseitig.ch</a></p>
            </div>
          </section>

        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
