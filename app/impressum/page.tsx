"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-[#C8E646] text-sm font-semibold mb-10 hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} /> Zurück zur Startseite
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-extrabold mb-2"
        >
          Impressum
        </motion.h1>
        <p className="text-white/70 leading-relaxed">
          Angaben gemäss Art. 12 ZGB und anwendbarem Schweizer Recht
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-8 text-white/70 leading-relaxed"
        >
          <section className="mt-4">
            <h2 className="text-white font-bold text-lg mb-2">Angaben zum Unternehmen</h2>
            <div className="bg-gray-800 p-4 rounded my-4">
              <p>
                Snow Dream Studios GmbH <br />
                Schärenmoosstrasse 77 <br />
                8052 Zürich
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-2">Kontaktdaten</h2>
            <div className="bg-gray-800 p-4 rounded my-4">
              <p>E-Mail: <a href="mailto:hallo@web-seitig.ch" className="text-[#C8E646] hover:underline">hallo@web-seitig.ch</a></p>
              <p>Web: <a href="https://web-seitig.ch" className="text-[#C8E646] hover:underline">web-seitig.ch</a></p>
            </div>
            <p>
              Für allgemeine Anfragen, Support oder Partnerschaftsanfragen erreichen Sie uns am schnellsten per E-Mail. Wir antworten in der Regel innerhalb von einem Werktag.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Verantwortlich für den Inhalt</h2>
            <p className="mb-1">Snow Dream Studios GmbH, vertreten durch die Geschäftsführung.</p>
            <p>Alle Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäss den geltenden gesetzlichen Vorschriften für eigene Inhalte auf unserer Website verantwortlich.</p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Haftung für Links</h2>
            <p className="mb-1">
              Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p>
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Urheberrecht und Nutzungsrechte</h2>
            <p className="mb-1">
              Die durch uns erstellten Inhalte und Werke auf dieser Website unterliegen dem Schweizer Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
            <p className="mb-2">
              Downloads und Kopien dieser Website sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Website nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
            </p>
            <div className="bg-gray-800 p-4 rounded my-4">
              <p>
                Alle auf dieser Website verwendeten Marken, Logos und Markennamen sind Eigentum von <br />
                Snow Dream Studios GmbH oder der jeweiligen Rechteinhaber und dürfen ohne ausdrückliche <br />
                Genehmigung nicht verwendet werden.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Anwendbares Recht und Gerichtsstand</h2>
            <p className="mb-1">
              Für alle Streitigkeiten aus oder im Zusammenhang mit diesem Internetauftritt gilt ausschliesslich Schweizer Recht. Gerichtsstand ist Zürich, Schweiz.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-lg mb-3">Letzte Aktualisierung</h2>
            <p className="mb-1">
              April 2025
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
