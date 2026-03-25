import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type Service = {
    title : Text;
    description : Text;
    iconName : Text;
  };

  type PortfolioItem = {
    title : Text;
    description : Text;
    category : Text;
    imageUrl : Text;
  };

  type Testimonial = {
    clientName : Text;
    role : Text;
    company : Text;
    quote : Text;
    rating : Nat;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Category = {
    name : Text;
    description : Text;
  };

  module Category {
    public func compare(category1 : Category, category2 : Category) : Order.Order {
      Text.compare(category1.name, category2.name);
    };
  };

  // Sample Data
  let services = List.fromArray<Service>([
    {
      title = "Web Design";
      description = "Beautiful, responsive websites tailored to your brand.";
      iconName = "palette";
    },
    {
      title = "UI/UX";
      description = "Intuitive, user-friendly interfaces for digital products.";
      iconName = "design";
    },
    {
      title = "Branding";
      description = "Complete brand identity packages for businesses.";
      iconName = "brand";
    },
    {
      title = "Copywriting";
      description = "Clear, persuasive copy for websites, ads, social media.";
      iconName = "pen";
    },
  ]);

  let portfolio = List.fromArray<PortfolioItem>([
    {
      title = "E-commerce Website";
      description = "Online store for handmade pottery business.";
      category = "Web Design";
      imageUrl = "pottery-shop.png";
    },
    {
      title = "Fitness App";
      description = "UI/UX design for workout tracking mobile app.";
      category = "UI/UX";
      imageUrl = "fitness-app.png";
    },
    {
      title = "Brand Guidelines";
      description = "Full branding package for tech startup.";
      category = "Branding";
      imageUrl = "brand-guidelines.png";
    },
    {
      title = "SaaS Landing Page";
      description = "High-converting landing page for B2B software.";
      category = "Web Design";
      imageUrl = "saas-landing.png";
    },
  ]);

  let testimonials = List.fromArray<Testimonial>([
    {
      clientName = "Jane Smith";
      role = "CEO";
      company = "Pottery Co.";
      quote = "Incredible work! My website looks amazing and I've seen a big increase in sales.";
      rating = 5;
    },
    {
      clientName = "Mike Johnson";
      role = "Founder";
      company = "FitLife";
      quote = "The app design was exactly what we wanted. Great communication throughout the project.";
      rating = 5;
    },
    {
      clientName = "Sarah Lee";
      role = "Marketing Director";
      company = "TechBoost";
      quote = "Fantastic branding work. Our new look is professional and consistent across platforms.";
      rating = 4;
    },
  ]);

  let categories = List.fromArray<Category>([
    { name = "Web Design"; description = "Website design and development projects" },
    { name = "UI/UX"; description = "User interface and user experience projects" },
    { name = "Branding"; description = "Brand identity and guidelines" },
    { name = "Copywriting"; description = "Content creation and writing projects" },
  ]);

  // Contact submissions
  let contactSubmissions = Map.empty<Text, ContactSubmission>();

  // Service methods
  public query ({ caller }) func getServices() : async [Service] {
    services.toArray();
  };

  // Portfolio methods
  public query ({ caller }) func getPortfolio() : async [PortfolioItem] {
    portfolio.toArray();
  };

  public query ({ caller }) func getPortfolioByCategory(category : Text) : async [PortfolioItem] {
    portfolio.filter(func(item) { Text.equal(item.category, category) }).toArray();
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categories.toArray().sort();
  };

  // Testimonial methods
  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.toArray();
  };

  // Contact methods
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    let timestamp = Time.now();
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp;
    };
    contactSubmissions.add(timestamp.toText(), submission);
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  public query ({ caller }) func getServiceTitles() : async [Text] {
    services.map<Service, Text>(func(s) { s.title }).toArray();
  };

  public query ({ caller }) func getPortfolioTitles() : async [Text] {
    portfolio.map<PortfolioItem, Text>(func(p) { p.title }).toArray();
  };

  public query ({ caller }) func getTestimonialCount() : async Nat {
    testimonials.size();
  };

  public query ({ caller }) func getServiceByTitle(title : Text) : async Service {
    switch (services.find(func(s) { Text.equal(s.title, title) })) {
      case (null) { Runtime.trap("Service not found") };
      case (?service) { service };
    };
  };
};
