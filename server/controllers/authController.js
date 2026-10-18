const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'veyora_healthcare_super_secret_key_123';

// Zod validation schemas
const registerSchema = z.object({
    name: z.preprocess(v => typeof v === 'string' ? v.trim() : v, z.string().min(1, 'Name is required')),
    email: z.preprocess(v => typeof v === 'string' ? v.toLowerCase().trim() : v, z.string().email('Invalid email address')),
    password: z.string().min(4, 'Password must be at least 4 characters'),
    phone: z.preprocess(v => (typeof v === 'string' && v.trim()) ? v.trim() : undefined, z.string().optional()),
    role: z.enum(['patient', 'doctor']),
    // Patient-specific (optional)
    age: z.preprocess(v => {
        if (v === '' || v === null || v === undefined || Number.isNaN(v)) return undefined;
        const n = Number(v);
        return isNaN(n) ? undefined : n;
    }, z.number().positive().optional()),
    gender: z.preprocess(v => v || 'Other', z.enum(['Male', 'Female', 'Other']).optional()),
    bloodGroup: z.preprocess(v => (typeof v === 'string' && v.trim()) ? v.trim() : undefined, z.string().optional()),
    allergies: z.array(z.string()).optional(),
    chronicConditions: z.array(z.string()).optional(),
    abhaId: z.string().optional(),
    languagePreference: z.string().optional(),
    // Doctor-specific (optional)
    specialization: z.string().optional(),
    facility_id: z.string().optional()
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user (patient, doctor, or coordinator)
 * @access  Public
 */
const register = async (req, res) => {
    try {
        // Validate input
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: parsed.error.flatten().fieldErrors
            });
        }

        const data = parsed.data;

        // Check if user already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Create user
        const user = await User.create({
            ...data,
            password: hashedPassword
        });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('[authController] register error:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT
 * @access  Public
 */
const login = async (req, res) => {
    try {
        // Validate input
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: parsed.error.flatten().fieldErrors
            });
        }

        const email = parsed.data.email.toLowerCase().trim();
        const password = parsed.data.password;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('[authController] login error:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = { register, login };
