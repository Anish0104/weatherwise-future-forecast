
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { 
  DashboardIcon, 
  ChartIcon, 
  MapIcon, 
  AlertIcon, 
  SettingsIcon 
} from "./ui/icons";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const sidebarVariants = {
    open: {
      width: "240px",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      }
    },
    closed: {
      width: "0px",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      }
    }
  };

  const navItems = [
    { 
      path: "/", 
      name: "Dashboard", 
      icon: DashboardIcon
    },
    { 
      path: "/analytics", 
      name: "Analytics", 
      icon: ChartIcon 
    },
    { 
      path: "/map", 
      name: "Map", 
      icon: MapIcon 
    },
    { 
      path: "/alerts", 
      name: "Alerts", 
      icon: AlertIcon 
    },
    { 
      path: "/settings", 
      name: "Settings", 
      icon: SettingsIcon 
    },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial={false}
      className="fixed left-0 h-full z-40 bg-sidebar border-r overflow-hidden"
    >
      <div className="flex flex-col h-full py-4">
        <div className="flex items-center justify-center mt-4 mb-8">
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-bold text-gradient"
          >
            WeatherWise
          </motion.div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary/20 text-primary-foreground font-medium"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <motion.span
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-2">
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-muted-foreground"
          >
            <p>WeatherWise v1.0</p>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
