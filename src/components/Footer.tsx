const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© 2026 AgentQ — Learn about AI agents</p>
          <p className="text-center sm:text-right">
            💡 Answers shown are examples for demonstration purposes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
