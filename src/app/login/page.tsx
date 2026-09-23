"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CarFront,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  User,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { loginUser } from "@/lib/api/auth";

type Role = "citizen" | "driver" | "authority";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [role, setRole] = useState<Role>("citizen");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [wheelCount, setWheelCount] = useState("6");
  const [shipmentType, setShipmentType] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!name.trim() || !phone.trim() || !location.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      role === "driver" &&
      (!wheelCount || !shipmentType)
    ) {
      setError("Please complete the driver details.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Send login information to the FastAPI backend
      const user = await loginUser({
        name: name.trim(),
        phone: phone.trim(),
        place: location.trim(),
      });

      // Store the backend user information locally
      const profile = {
        role,

        // Backend user information
        userId: user.user_id,
        name: user.name,
        phone: user.phone,
        location: user.place,
        backendRole: user.role,

        // Driver-specific information
        ...(role === "driver"
          ? {
              vehicle: {
                wheelCount: Number(wheelCount),
              },
              shipment: {
                type: shipmentType,
                details: shipmentDetails,
              },
            }
          : {}),
      };

      localStorage.setItem(
        "ner-safe-profile",
        JSON.stringify(profile)
      );

      sessionStorage.setItem(
        "ner-safe-login-transition",
        "true"
      );

      // Navigate according to selected frontend role
      if (role === "authority") {
        router.push("/dashboard?role=authority");
        return;
      }

      if (role === "driver") {
        router.push("/dashboard?role=driver");
        return;
      }

      router.push("/dashboard?role=citizen");
    } catch (err) {
      console.error("Login failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the login service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="background-glow background-glow-one" />
      <div className="background-glow background-glow-two" />

      {/* Header */}
      <motion.header
        className="login-header"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="brand">
          <div className="brand-mark">
            <ShieldCheck size={20} />
          </div>

          <div>
            <div className="brand-name">
              NER-SAFE
            </div>

            <div className="brand-subtitle">
              {t.login.brandSubtitle}
            </div>
          </div>
        </div>

        <div className="login-security">
          <ShieldCheck size={14} />
          {t.login.secureSession}
        </div>
      </motion.header>

      {/* Main */}
      <section className="login-container">
        <motion.div
          className="login-card glass"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <div className="login-heading">
            <div className="login-icon">
              <ShieldCheck size={25} />
            </div>

            <div>
              <div className="login-eyebrow">
                {t.login.eyebrow}
              </div>

              <h1>{t.login.title}</h1>

              <p>
                {t.login.description}
              </p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="role-section">
            <label className="role-section-label">
              {t.login.role.label}
            </label>

            <div className="role-grid">
              {/* Citizen */}
              <button
                type="button"
                className={`role-card ${
                  role === "citizen"
                    ? "role-card-active"
                    : ""
                }`}
                onClick={() => {
                  setRole("citizen");
                  setError("");
                }}
              >
                <div className="role-icon">
                  <User size={20} />
                </div>

                <div className="role-content">
                  <strong>
                    {t.login.role.citizen.name}
                  </strong>

                  <span>
                    {t.login.role.citizen.description}
                  </span>
                </div>
              </button>

              {/* Driver */}
              <button
                type="button"
                className={`role-card ${
                  role === "driver"
                    ? "role-card-active"
                    : ""
                }`}
                onClick={() => {
                  setRole("driver");
                  setError("");
                }}
              >
                <div className="role-icon">
                  <Truck size={20} />
                </div>

                <div className="role-content">
                  <strong>
                    {t.login.role.driver.name}
                  </strong>

                  <span>
                    {t.login.role.driver.description}
                  </span>
                </div>
              </button>

              {/* Authority */}
              <button
                type="button"
                className={`role-card ${
                  role === "authority"
                    ? "role-card-active"
                    : ""
                }`}
                onClick={() => {
                  setRole("authority");
                  setError("");
                }}
              >
                <div className="role-icon">
                  <Users size={20} />
                </div>

                <div className="role-content">
                  <strong>
                    {t.login.role.authority.name}
                  </strong>

                  <span>
                    {t.login.role.authority.description}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            className="login-form"
            onSubmit={(event) => {
              event.preventDefault();
              handleContinue();
            }}
          >
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">
                {t.login.form.fullName}
              </label>

              <div className="input-wrapper">
                <User size={17} />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder={
                    t.login.form.fullNamePlaceholder
                  }
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                {t.login.form.mobileNumber}
              </label>

              <div className="input-wrapper">
                <Phone size={17} />

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  placeholder={
                    t.login.form.mobileNumberPlaceholder
                  }
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">
                {role === "authority"
                  ? t.login.form.operatingArea
                  : t.login.form.currentLocation}
              </label>

              <div className="input-wrapper">
                <MapPin size={17} />

                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                    setError("");
                  }}
                  placeholder={
                    role === "authority"
                      ? t.login.form
                          .operatingAreaPlaceholder
                      : t.login.form.locationPlaceholder
                  }
                />
              </div>
            </div>

            {/* DRIVER ONLY */}
            {role === "driver" && (
              <motion.div
                className="driver-details"
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                transition={{ duration: 0.25 }}
              >
                <div className="driver-section-header">
                  <div className="driver-section-icon">
                    <Truck size={17} />
                  </div>

                  <div>
                    <strong>
                      {t.login.driver.title}
                    </strong>

                    <span>
                      {t.login.driver.description}
                    </span>
                  </div>
                </div>

                {/* Wheel Count */}
                <div className="form-group">
                  <label htmlFor="wheel-count">
                    {t.login.driver.vehicleType}
                  </label>

                  <div className="input-wrapper select-wrapper">
                    <CarFront size={17} />

                    <select
                      id="wheel-count"
                      value={wheelCount}
                      onChange={(event) =>
                        setWheelCount(
                          event.target.value
                        )
                      }
                    >
                      <option value="6">
                        {t.login.driver.wheel6}
                      </option>

                      <option value="10">
                        {t.login.driver.wheel10}
                      </option>

                      <option value="12">
                        {t.login.driver.wheel12}
                      </option>

                      <option value="14">
                        {t.login.driver.wheel14}
                      </option>

                      <option value="18">
                        {t.login.driver.wheel18}
                      </option>

                      <option value="22">
                        {t.login.driver.wheel22}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Shipment */}
                <div className="form-group">
                  <label htmlFor="shipment">
                    {t.login.driver.shipmentType}
                  </label>

                  <div className="input-wrapper">
                    <Truck size={17} />

                    <select
                      id="shipment"
                      value={shipmentType}
                      onChange={(event) =>
                        setShipmentType(
                          event.target.value
                        )
                      }
                    >
                      <option value="">
                        {
                          t.login.driver
                            .shipmentPlaceholder
                        }
                      </option>

                      <option value="general">
                        {t.login.driver.generalCargo}
                      </option>

                      <option value="food">
                        {t.login.driver.foodPerishable}
                      </option>

                      <option value="medical">
                        {t.login.driver.medicalSupplies}
                      </option>

                      <option value="construction">
                        {
                          t.login.driver
                            .constructionMaterial
                        }
                      </option>

                      <option value="industrial">
                        {t.login.driver.industrialGoods}
                      </option>

                      <option value="other">
                        {t.login.driver.other}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="form-group">
                  <label htmlFor="shipment-details">
                    {t.login.driver.shipmentDetails}

                    <span className="optional-label">
                      {t.login.driver.optional}
                    </span>
                  </label>

                  <div className="textarea-wrapper">
                    <textarea
                      id="shipment-details"
                      value={shipmentDetails}
                      onChange={(event) =>
                        setShipmentDetails(
                          event.target.value
                        )
                      }
                      placeholder={
                        t.login.driver
                          .shipmentDetailsPlaceholder
                      }
                      rows={3}
                    />
                  </div>
                </div>

                <div className="driver-info-note">
                  <ShieldCheck size={14} />

                  <span>
                    {t.login.driver.info}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Error */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Continue */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Connecting..."
                : role === "authority"
                ? t.login.actions
                    .continueToCommandCentre
                : t.login.actions.continue}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Privacy */}
          <div className="login-note">
            <ShieldCheck size={14} />

            <span>
              {t.login.privacy}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bottom-bar">
        <span>{t.login.footer.sih}</span>
        <span>•</span>
        <span>
          {t.login.footer.technology}
        </span>
      </footer>
    </main>
  );
}