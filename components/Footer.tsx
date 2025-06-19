"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Heart, Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowUp, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = {
    services: [
      { name: "Web Design", href: "#" },
      { name: "Development", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "SEO Services", href: "#" },
      { name: "Consulting", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "Support", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "hover:bg-gray-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-blue-500" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-500" },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden border-t">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.h3
                className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ModernWeb
              </motion.h3>
              <p className="text-muted-foreground leading-relaxed">
                Creating exceptional digital experiences that drive growth and innovation for businesses worldwide.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, text: "hello@modernweb.com", href: "mailto:hello@modernweb.com" },
                { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
                { icon: MapPin, text: "123 Web Street, Digital City", href: "#" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  whileHover={{ x: 5 }}
                >
                  <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-200 inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-200 inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-200 inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20 shadow-xl">
            <CardContent className="p-8">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Mail className="w-4 h-4" />
                  Newsletter
                </motion.div>
                <h4 className="text-3xl font-bold mb-4">Stay Updated</h4>
                <p className="text-muted-foreground mb-8 text-lg">
                  Subscribe to our newsletter and get the latest updates on web design trends and tips.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                  />
                  <Button className="h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <motion.div className="flex items-center space-x-2 text-muted-foreground" whileHover={{ scale: 1.05 }}>
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              </motion.div>
              <span>by ModernWeb Team</span>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((social, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(social.href, "_blank")}
                    className={`h-12 w-12 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="text-muted-foreground text-sm">© 2024 ModernWeb. All rights reserved.</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button - Positioned at Bottom Left */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
          aria-label="Scroll to top"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <ArrowUp className="w-6 h-6 text-white" />
          </motion.div>
        </Button>
      </motion.div>
    </footer>
  )
}

export default Footer
