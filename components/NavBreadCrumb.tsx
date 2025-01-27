import React from "react";
import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface HeaderProps {
  breadcrumbItems: {
    label: string;
    href?: string;
    isCurrentPage?: boolean;
  }[];
}

const NavBreadCrumb: React.FC<HeaderProps> = ({ breadcrumbItems }) => {
  return (
    <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList className="!gap-1">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem className="bg-white rounded-[29px] !p-[2px_8px]">
                {item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    <span className="!text-[#6c8ea0]">{item.label}</span>
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                  <Slash className="text-[#ccc] !w-[10px] !h-[10px] transform rotate-[-25deg]" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default NavBreadCrumb;
