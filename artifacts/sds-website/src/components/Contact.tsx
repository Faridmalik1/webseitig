import React, { useState } from "react";
import { useTranslation } from "../lib/i18n";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle2, MapPin, Mail, Phone, Clock } from "lucide-react";

export function Contact() {
  const { t, lang } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const submitContact = useSubmitContact();

  const formSchema = z.object({
    name: z.string().min(1, { message: t("validation.name_required") }),
    email: z.string().min(1, { message: t("validation.email_required") }).email({ message: t("validation.email_invalid") }),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().min(1, { message: t("validation.message_required") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitContact.mutate(
      { data: { ...values, language: lang } },
      {
        onSuccess: () => {
          setShowModal(true);
          form.reset();
          setTimeout(() => setShowModal(false), 5000);
        },
      }
    );
  };

  return (
    <section id="contact" className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6"
          >
            {t("contact.badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t("contact.info_title")}</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-muted-foreground">{t("contact.info_address")}</span>
                </div>
                <div className="flex gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-muted-foreground">{t("contact.info_email")}</span>
                </div>
                <div className="flex gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-muted-foreground">{t("contact.info_phone")}</span>
                </div>
                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-muted-foreground">{t("contact.info_hours")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-card border border-border/50 rounded-2xl p-8 shadow-sm"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.name_label")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact.name_placeholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.email_label")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact.email_placeholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.phone_label")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact.phone_placeholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.subject_label")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("contact.subject_placeholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">{t("contact.subject_option1")}</SelectItem>
                            <SelectItem value="project">{t("contact.subject_option2")}</SelectItem>
                            <SelectItem value="partnership">{t("contact.subject_option3")}</SelectItem>
                            <SelectItem value="support">{t("contact.subject_option4")}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.message_label")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t("contact.message_placeholder")} 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto px-8"
                  disabled={submitContact.isPending}
                >
                  {submitContact.isPending ? t("contact.sending") : t("contact.submit")}
                </Button>
                
                {submitContact.isError && (
                  <p className="text-sm text-destructive mt-2">{t("contact.error")}</p>
                )}
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">{t("thankyou.title")}</DialogTitle>
            <DialogDescription className="text-base mt-2">
              {t("thankyou.message")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-6">
            <Button type="button" onClick={() => setShowModal(false)}>
              {t("thankyou.close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
